'use client';

import { useOthers } from '@/lib/liveblocks';
import { motion } from 'framer-motion';

export default function LiveCursors() {
  // Check if Liveblocks is configured
  const hasLiveblocks = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY && 
                        process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY !== 'pk_demo';
  
  // Always call hooks (React requirement)
  const others = hasLiveblocks ? useOthers() : [];

  // No cursors in demo mode without Liveblocks
  if (!hasLiveblocks) {
    return null;
  }

  return (
    <>
      {others.map((other) => {
        if (!other.presence.cursor) return null;

        return (
          <motion.div
            key={other.connectionId}
            className="pointer-events-none absolute z-50"
            style={{
              left: other.presence.cursor.x,
              top: other.presence.cursor.y,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Cursor SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.65376 12.3673L11.6868 6.33427C12.2914 5.72968 13.2898 5.72968 13.8944 6.33427L19.9274 12.3673C20.532 12.9719 20.532 13.9703 19.9274 14.5749L13.8944 20.6079C13.2898 21.2125 12.2914 21.2125 11.6868 20.6079L5.65376 14.5749C5.04917 13.9703 5.04917 12.9719 5.65376 12.3673Z"
                fill={other.presence.user.color}
                stroke="#000"
                strokeWidth="1"
              />
            </svg>

            {/* User label */}
            <motion.div
              className="ml-4 mt-1 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg"
              style={{
                backgroundColor: other.presence.user.color,
                color: '#000',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {other.presence.user.name}
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

