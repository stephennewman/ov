'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, User, TrendingUp, Award, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { mockTasks, mockUsers } from '@/lib/mockData';
import type { ActivityLogItem } from '@/lib/types';

interface FeedViewProps {
  activities: ActivityLogItem[];
}

export default function FeedView({ activities }: FeedViewProps) {
  const completed = mockTasks.filter((t) => t.status === 'done');
  const upcoming = mockTasks.filter((t) => t.status === 'not_started');
  const inProgress = mockTasks.filter((t) => t.status === 'in_progress');

  const teams = [
    { name: 'Clinical Ops', members: 12, color: '#22d3ee', active: 8 },
    { name: 'Facilities', members: 8, color: '#f59e0b', active: 5 },
    { name: 'Radiology', members: 6, color: '#8b5cf6', active: 4 },
    { name: 'Administration', members: 5, color: '#10b981', active: 3 },
  ];

  const topPerformers = [
    { name: 'Sarah Chen', role: 'RN', tasks: 23, streak: 7, color: '#22d3ee' },
    { name: 'Marcus Wilson', role: 'FD', tasks: 18, streak: 5, color: '#f59e0b' },
    { name: 'Elena Rodriguez', role: 'RT', tasks: 16, streak: 4, color: '#8b5cf6' },
  ];

  return (
    <div className="h-full flex gap-4 p-4">
      {/* Left Sidebar - Upcoming & Teams */}
      <aside className="w-80 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-y-auto">
        {/* Upcoming Tasks */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Upcoming</h3>
            <span className="ml-auto text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded-full font-medium">
              {upcoming.length}
            </span>
          </div>
          <div className="space-y-2">
            {upcoming.slice(0, 5).map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate mb-1">
                  {task.title}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: task.department?.color }}
                  />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                    {task.department?.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">In Progress</h3>
            <span className="ml-auto text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full font-medium">
              {inProgress.length}
            </span>
          </div>
          <div className="space-y-2">
            {inProgress.slice(0, 3).map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/30"
              >
                <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate mb-1">
                  {task.title}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: task.department?.color }}
                    />
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      {task.department?.name}
                    </span>
                  </div>
                  {task.assigned_user && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                      {task.assigned_user.role}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Teams */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Teams</h3>
          </div>
          <div className="space-y-2">
            {teams.map((team) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: team.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {team.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {team.active} active · {team.members} total
                    </div>
                  </div>
                  <div className="flex -space-x-1">
                    {mockUsers.slice(0, 3).map((user, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.role}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </aside>

      {/* Center Feed - Twitter Style */}
      <main className="flex-1 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 z-10">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Activity Feed</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Real-time updates from your team</p>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                {activity.user?.avatar_url ? (
                  <img
                    src={activity.user.avatar_url}
                    alt={activity.user.full_name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: activity.user?.role_color || '#666' }}
                  >
                    {activity.user?.role || '?'}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {activity.user?.full_name || 'Unknown'}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                        @{activity.user?.role || 'user'}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                    {activity.action === 'completed' && '✅ Completed'}
                    {activity.action === 'started' && '▶️ Started'}
                    {activity.action === 'updated' && '📝 Updated'}
                    {activity.action === 'flagged' && '🚩 Flagged'}
                    {' '}
                    <span className="font-medium">{activity.task?.title}</span>
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: activity.task?.department?.color }}
                      />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {activity.task?.department?.name}
                      </span>
                    </div>
                    <StatusBadge status={activity.new_status || activity.task?.status} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Right Sidebar - Completed & Leaderboard */}
      <aside className="w-80 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-y-auto">
        {/* Top Performers */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <motion.div
                key={performer.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg"
              >
                <div className="text-lg font-bold text-zinc-400 dark:text-zinc-600 w-6">
                  #{index + 1}
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: performer.color }}
                >
                  {performer.role}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {performer.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    {performer.tasks} tasks · {performer.streak} day streak
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recently Completed */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Completed</h3>
            <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
              {completed.length}
            </span>
          </div>
          <div className="space-y-2">
            {completed.slice(0, 8).map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-2 bg-green-50 dark:bg-green-900/10 rounded-lg flex items-start gap-2"
              >
                <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {task.title}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: task.department?.color }}
                    />
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      {task.department?.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </aside>
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
      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
        colors[status] || 'bg-zinc-100 text-zinc-600'
      }`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

