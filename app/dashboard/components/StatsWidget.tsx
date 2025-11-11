'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface StatsWidgetProps {
  stats: {
    totalTasks: number;
    completed: number;
    inProgress: number;
    overdue: number;
    needsApproval: number;
  };
}

export default function StatsWidget({ stats }: StatsWidgetProps) {
  const widgets = [
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: '#22c55e',
      bgColor: 'rgba(34, 197, 94, 0.1)',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: '#eab308',
      bgColor: 'rgba(234, 179, 8, 0.1)',
    },
    {
      label: 'Needs Approval',
      value: stats.needsApproval,
      icon: TrendingUp,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {widgets.map((widget, index) => {
        const Icon = widget.icon;
        return (
          <motion.div
            key={widget.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-sm"
            style={{ backgroundColor: widget.bgColor }}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-5 h-5" style={{ color: widget.color }} />
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{widget.value}</span>
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">{widget.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

