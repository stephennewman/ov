'use client';

import { useEffect, useState } from 'react';
import { useUpdateMyPresence } from '@/lib/liveblocks';
import DashboardHeader from '../components/DashboardHeader';
import FeedView from '../components/FeedView';
import LiveCursors from '../components/LiveCursors';
import type { ActivityLogItem } from '@/lib/types';
import { mockActivities, generateMockActivity } from '@/lib/mockData';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function FeedPage() {
  const [activities, setActivities] = useState<ActivityLogItem[]>(mockActivities);
  const { theme, toggleTheme } = useTheme();

  const hasLiveblocks = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY &&
                        process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY !== 'pk_demo';

  const updateMyPresence = hasLiveblocks ? useUpdateMyPresence() : () => {};

  // Track cursor position for real-time collaboration
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

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = generateMockActivity();
      setActivities((prev) => [newActivity, ...prev].slice(0, 20));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900">
      <DashboardHeader facility="GEMD31" />

      <div className="h-[calc(100vh-73px)]">
        <FeedView activities={activities} />
      </div>

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

      <LiveCursors />
    </div>
  );
}

