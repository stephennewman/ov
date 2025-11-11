'use client';

import { useState, useEffect } from 'react';
import { Signal, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { mockUsers } from '@/lib/mockData';
import OutcomeViewLogo from './OutcomeViewLogo';

interface DashboardHeaderProps {
  facility?: string;
}

export default function DashboardHeader({ facility = 'GEMD31' }: DashboardHeaderProps) {
  const [lastSync, setLastSync] = useState(0);
  const [liveMode, setLiveMode] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="flex items-center justify-between px-8 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      {/* Left: Logo and Status */}
      <div className="flex items-center gap-6">
        <OutcomeViewLogo size="sm" showText={true} />
        <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="text-zinc-900 dark:text-zinc-200 font-mono font-semibold">{facility}</span>
          <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />
          <div className="flex items-center gap-1.5">
            <Signal
              className={`w-3.5 h-3.5 ${
                liveMode ? 'text-green-600 animate-pulse' : 'text-zinc-400'
              }`}
            />
            <span className={liveMode ? 'text-green-600 font-medium' : 'text-zinc-500'}>
              {liveMode ? 'Live' : 'Paused'}
            </span>
          </div>
          <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-cyan-600 font-mono font-semibold">{lastSync}s</span>
        </div>
      </div>

      {/* Right: Empty space (theme toggle moved to bottom right) */}
      <div></div>
    </header>
  );
}

