'use client';

import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2, FileSignature } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';
import type { Task } from '@/lib/types';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: string) => void;
}

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const [showQR, setShowQR] = useState(false);

  const statusIcons = {
    not_started: Clock,
    in_progress: Clock,
    done: CheckCircle2,
    flagged: AlertCircle,
    needs_approval: FileSignature,
    overdue: AlertCircle,
  };

  const StatusIcon = statusIcons[task.status] || Clock;

  const statusColors: Record<string, string> = {
    not_started: '#71717a',
    in_progress: '#eab308',
    done: '#22c55e',
    flagged: '#ef4444',
    needs_approval: '#3b82f6',
    overdue: '#dc2626',
  };

  const taskUrl = `https://outcomeview.app/task/${task.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <StatusIcon
              className="w-4 h-4"
              style={{ color: statusColors[task.status] }}
            />
            <h4 className="text-sm font-semibold text-zinc-200">{task.title}</h4>
          </div>
          {task.description && (
            <p className="text-xs text-zinc-500 line-clamp-2">{task.description}</p>
          )}
        </div>

        {/* QR Code Toggle */}
        <button
          onClick={() => setShowQR(!showQR)}
          className="ml-2 p-1 hover:bg-zinc-800 rounded transition-colors"
          title="Show QR Code"
        >
          <div className="w-6 h-6 border border-zinc-700 rounded flex items-center justify-center text-[8px] text-zinc-500">
            QR
          </div>
        </button>
      </div>

      {/* QR Code Popup */}
      {showQR && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-3 p-3 bg-white rounded-lg"
        >
          <QRCodeSVG value={taskUrl} size={120} level="M" className="mx-auto" />
          <p className="text-[10px] text-zinc-900 text-center mt-2 font-mono">
            Scan to open task
          </p>
        </motion.div>
      )}

      {/* Task Meta */}
      <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
        {task.due_date && (
          <span>Due {formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}</span>
        )}
        {task.requires_signature && (
          <span className="flex items-center gap-1 text-blue-400">
            <FileSignature className="w-3 h-3" />
            Signature
          </span>
        )}
      </div>

      {/* Assigned User */}
      {task.assigned_user && (
        <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: task.assigned_user.role_color }}
          >
            {task.assigned_user.role}
          </div>
          <span className="text-xs text-zinc-400">{task.assigned_user.full_name}</span>
        </div>
      )}
    </motion.div>
  );
}

