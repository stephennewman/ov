'use client';

import { motion } from 'framer-motion';
import { Activity, Building, FileText, Stethoscope, ChevronRight } from 'lucide-react';
import type { Department } from '@/lib/types';

interface DepartmentGridProps {
  departments: Department[];
  stats: Record<string, { completed: number; total: number; inProgress: number }>;
}

export default function DepartmentGrid({ departments, stats }: DepartmentGridProps) {
  const iconMap: Record<string, any> = {
    Stethoscope,
    Building,
    Activity,
    FileText,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {departments.map((dept, index) => {
        const Icon = iconMap[dept.icon] || Activity;
        const deptStats = stats[dept.id] || { completed: 0, total: 0, inProgress: 0 };
        const completionRate =
          deptStats.total > 0 ? Math.round((deptStats.completed / deptStats.total) * 100) : 0;

        return (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${dept.color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: dept.color }} />
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
            </div>

            {/* Department Name */}
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{dept.name}</h3>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Completion</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-mono font-semibold">{completionRate}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: dept.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
              </div>

              {/* Task Counts */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-zinc-600 dark:text-zinc-400">{deptStats.completed} done</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-zinc-600 dark:text-zinc-400">{deptStats.inProgress} in progress</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

