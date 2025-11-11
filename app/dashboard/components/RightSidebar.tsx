'use client';

import { mockUsers } from '@/lib/mockData';
import LiveStreamBoard from './LiveStreamBoard';
import type { ActivityLogItem } from '@/lib/types';

interface RightSidebarProps {
  activities: ActivityLogItem[];
}

export default function RightSidebar({ activities }: RightSidebarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <aside className="w-80 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full">
      {/* Active Users Section */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
          Active Now
        </h3>
        <div className="space-y-2">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-9 h-9 rounded-full flex-shrink-0"
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: user.role_color }}
                >
                  {getInitials(user.full_name)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {user.full_name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{user.role}</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Live Activity Stream */}
      <div className="flex-1 overflow-hidden">
        <LiveStreamBoard activities={activities} />
      </div>
    </aside>
  );
}

