'use client';

import { useEffect, useState } from 'react';
import { useUpdateMyPresence } from '@/lib/liveblocks';
import DashboardHeader from './components/DashboardHeader';
import RightSidebar from './components/RightSidebar';
import LiveCursors from './components/LiveCursors';
import CriticalItems from './components/CriticalItems';
import FeedView from './components/FeedView';
import TVView from './components/TVView';
import TVView2 from './components/TVView2';
import ViewSwitcher, { type DashboardView } from './components/ViewSwitcher';
import type { ActivityLogItem } from '@/lib/types';
import { mockActivities, generateMockActivity } from '@/lib/mockData';
import { fetchActivityLog, subscribeToActivityLog } from '@/lib/supabase';
import { useAuth } from './components/AuthProvider';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [activities, setActivities] = useState<ActivityLogItem[]>(mockActivities);
  const [view, setView] = useState<DashboardView>('command');
  const { user, loading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  // Check if Supabase is configured
  const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://demo.supabase.co';

  // Check if Liveblocks is configured
  const hasLiveblocks = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY && 
                        process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY !== 'pk_demo';

  // Always call hooks (React requirement) - will only work if RoomProvider is wrapping
  const updateMyPresence = hasLiveblocks ? useUpdateMyPresence() : () => {};

  // Track cursor position for real-time collaboration (only if Liveblocks configured)
  useEffect(() => {
    if (!hasLiveblocks) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateMyPresence({
        cursor: { x: e.clientX, y: e.clientY },
      });
    };

    const handleMouseLeave = () => {
      updateMyPresence({ cursor: null });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [updateMyPresence, hasLiveblocks]);

  // Fetch real activities from Supabase or use mock data
  useEffect(() => {
    if (!hasSupabase || !user) {
      // Demo mode - simulate real-time activity updates
      const interval = setInterval(() => {
        const newActivity = generateMockActivity();
        setActivities((prev) => [newActivity, ...prev].slice(0, 20));
      }, 8000);
      return () => clearInterval(interval);
    }

    // Real mode - fetch from Supabase
    const loadActivities = async () => {
      try {
        const { data, error } = await fetchActivityLog('GEMD31', 50);
        if (data && !error) {
          setActivities(data as ActivityLogItem[]);
        }
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      }
    };

    loadActivities();

    // Subscribe to real-time updates
    const subscription = subscribeToActivityLog('GEMD31', (payload) => {
      if (payload.eventType === 'INSERT') {
        setActivities((prev) => [payload.new as ActivityLogItem, ...prev].slice(0, 50));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [hasSupabase, user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900">
      <DashboardHeader facility="GEMD31" />

      {/* Enhanced Header with View Switcher */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <ViewSwitcher currentView={view} onViewChange={setView} />
          
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="hidden sm:inline text-zinc-700 dark:text-zinc-300">
                  {user.email}
                </span>
              </div>
            )}
            
            {hasSupabase && (
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* View Router */}
      {view === 'command' && (
        <div className="flex h-[calc(100vh-73px-57px)]">
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Command Center</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Critical items and outstanding tasks</p>
              </div>
              <CriticalItems />
            </div>
          </main>
          <RightSidebar activities={activities} />
        </div>
      )}

      {view === 'feed' && (
        <div className="h-[calc(100vh-73px-57px)]">
          <FeedView activities={activities} />
        </div>
      )}

      {view === 'tv1' && (
        <div className="h-[calc(100vh-73px-57px)]">
          <TVView activities={activities} />
        </div>
      )}

      {view === 'tv2' && (
        <div className="h-[calc(100vh-73px-57px)]">
          <TVView2 activities={activities} />
        </div>
      )}

      {/* Floating Theme Toggle - Bottom Right */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-110 z-50"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
        ) : (
          <Sun className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
        )}
      </button>

      {/* Live Cursors Overlay */}
      <LiveCursors />
    </div>
  );
}

