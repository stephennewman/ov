'use client';

import { useState } from 'react';
import { LayoutDashboard, TvMinimal, Activity, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export type DashboardView = 'command' | 'tv1' | 'tv2' | 'feed';

interface ViewSwitcherProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

const views = [
  { id: 'command' as DashboardView, name: 'Command Center', icon: LayoutDashboard, description: 'Critical items & priorities' },
  { id: 'feed' as DashboardView, name: 'Activity Feed', icon: Activity, description: 'Real-time updates' },
  { id: 'tv1' as DashboardView, name: 'TV Display', icon: TvMinimal, description: '4-column overview' },
  { id: 'tv2' as DashboardView, name: 'TV Display 2', icon: Monitor, description: '3-section layout' },
];

export default function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = currentView === view.id;
        
        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`
              relative px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }
            `}
            title={view.description}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{view.name}</span>
            </div>
            
            {isActive && (
              <motion.div
                layoutId="activeView"
                className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

