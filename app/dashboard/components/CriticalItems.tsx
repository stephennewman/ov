'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockTasks } from '@/lib/mockData';

export default function CriticalItems() {
  const needsApproval = mockTasks.filter((t) => t.status === 'needs_approval');
  const overdue = mockTasks.filter((t) => t.status === 'overdue');
  const inProgress = mockTasks.filter((t) => t.status === 'in_progress');

  // Mock compliance score
  const complianceScore = 92;

  // Mock problems
  const problems = [
    {
      id: '1',
      title: 'Broken window in Facility B',
      department: 'Facilities & Safety',
      severity: 'high',
      reported: '2 hours ago',
    },
    {
      id: '2',
      title: 'Spill in Lab Room 3',
      department: 'Clinical Operations',
      severity: 'urgent',
      reported: '15 minutes ago',
    },
    {
      id: '3',
      title: 'HVAC temperature fluctuation',
      department: 'Facilities & Safety',
      severity: 'medium',
      reported: '1 day ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Compliance Score - Big and Bold */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-xl p-8 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium opacity-90 mb-2">Daily Compliance Score</div>
            <div className="text-6xl font-bold">{complianceScore}%</div>
            <div className="text-sm opacity-75 mt-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              +3% from yesterday
            </div>
          </div>
          <CheckCircle className="w-24 h-24 opacity-20" />
        </div>
      </motion.div>

      {/* Critical Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Needs Approval */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Needs Approval</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Requires your attention</p>
            </div>
            <div className="ml-auto">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{needsApproval.length}</span>
            </div>
          </div>
          <div className="space-y-2">
            {needsApproval.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{task.title}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{task.department?.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Overdue Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 border-2 border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Overdue</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Past deadline</p>
            </div>
            <div className="ml-auto">
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">{overdue.length}</span>
            </div>
          </div>
          <div className="space-y-2">
            {overdue.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors cursor-pointer border border-red-200 dark:border-red-800"
              >
                <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{task.title}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{task.department?.name}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Problems / Issues */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Identified Problems</h3>
          <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-400">{problems.length} active</span>
        </div>
        <div className="space-y-3">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-orange-300 dark:hover:border-orange-700 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  problem.severity === 'urgent' ? 'bg-red-500 animate-pulse' :
                  problem.severity === 'high' ? 'bg-orange-500' :
                  'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{problem.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{problem.department}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">• {problem.reported}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  problem.severity === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                  problem.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                }`}>
                  {problem.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Incomplete Collections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
      >
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Incomplete Collections</h3>
        <div className="space-y-3">
          <div className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Morning Clinical Checklist</span>
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">8/10 tasks</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '80%' }} />
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">80% complete • 2 remaining</div>
          </div>

          <div className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Facilities Monthly Checklist</span>
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">12/15 tasks</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }} />
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">80% complete • 3 remaining</div>
          </div>

          <div className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Radiology Safety Review</span>
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">4/6 tasks</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }} />
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">67% complete • 2 remaining</div>
          </div>
        </div>
      </motion.div>

      {/* Daily/Weekly/Monthly Summaries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
      >
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Completion Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">94%</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Today</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">89%</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">This Week</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">91%</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">This Month</div>
          </div>
        </div>

        {/* By Department */}
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">By Department (Today)</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Clinical Operations</span>
              <span className="font-semibold text-green-600 dark:text-green-400">96%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Facilities & Safety</span>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">88%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Radiology</span>
              <span className="font-semibold text-green-600 dark:text-green-400">92%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Administration</span>
              <span className="font-semibold text-green-600 dark:text-green-400">98%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

