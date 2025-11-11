'use client';

import { useState } from 'react';
import { CheckCircle, Clock, PlayCircle, AlertCircle, XCircle } from 'lucide-react';
import { updateTask } from '@/lib/api';
import { motion } from 'framer-motion';

interface TaskStatusButtonProps {
  taskId: string;
  currentStatus: string;
  userId: string;
  onUpdate?: () => void;
}

const statusOptions = [
  { value: 'not_started', label: 'Not Started', icon: Clock, color: 'text-zinc-500' },
  { value: 'in_progress', label: 'In Progress', icon: PlayCircle, color: 'text-yellow-500' },
  { value: 'done', label: 'Done', icon: CheckCircle, color: 'text-green-500' },
  { value: 'needs_approval', label: 'Needs Approval', icon: AlertCircle, color: 'text-blue-500' },
  { value: 'overdue', label: 'Overdue', icon: XCircle, color: 'text-red-500' },
];

export default function TaskStatusButton({ taskId, currentStatus, userId, onUpdate }: TaskStatusButtonProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) {
      setShowMenu(false);
      return;
    }

    setLoading(true);
    try {
      await updateTask(taskId, newStatus, userId);
      setStatus(newStatus);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  const currentOption = statusOptions.find(opt => opt.value === status) || statusOptions[0];
  const Icon = currentOption.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading}
        className={`
          flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
          border transition-all
          ${status === 'not_started' && 'bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'}
          ${status === 'in_progress' && 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300'}
          ${status === 'done' && 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'}
          ${status === 'needs_approval' && 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'}
          ${status === 'overdue' && 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300'}
          hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Icon className="w-3 h-3" />
        )}
        <span>{currentOption.label}</span>
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-50 min-w-[160px] overflow-hidden"
          >
            {statusOptions.map((option) => {
              const OptionIcon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-sm text-left
                    hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors
                    ${option.value === status ? 'bg-zinc-100 dark:bg-zinc-700' : ''}
                  `}
                >
                  <OptionIcon className={`w-4 h-4 ${option.color}`} />
                  <span className="text-zinc-900 dark:text-zinc-100">{option.label}</span>
                </button>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
}

