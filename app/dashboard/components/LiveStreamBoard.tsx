'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { ActivityLogItem } from '@/lib/types';

interface LiveStreamBoardProps {
  activities: ActivityLogItem[];
}

export default function LiveStreamBoard({ activities }: LiveStreamBoardProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 sticky top-0 bg-white dark:bg-zinc-900 z-10">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Live Activity</h2>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{
                opacity: 0,
                x: 20,
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
              }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* User Avatar/Initial */}
                {activity.user?.avatar_url ? (
                  <img
                    src={activity.user.avatar_url}
                    alt={activity.user.full_name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: activity.user?.role_color || '#666' }}
                  >
                    {activity.user?.role || '?'}
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {activity.user?.full_name || 'Unknown'}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    {activity.action === 'completed' && '✅ Completed'}
                    {activity.action === 'started' && '▶️ Started'}
                    {activity.action === 'updated' && '📝 Updated'}
                    {activity.action === 'flagged' && '🚩 Flagged'}
                    {' '}
                    <span className="font-medium">{activity.task?.title}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: activity.task?.department?.color }}
                    />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {activity.task?.department?.name}
                    </span>
                    <StatusBadge status={activity.new_status || activity.task?.status} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;

  const colors: Record<string, string> = {
    not_started: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
    in_progress: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    done: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    flagged: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    needs_approval: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    overdue: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse',
  };

  return (
    <span
      className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
        colors[status] || 'bg-zinc-100 text-zinc-600'
      }`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

