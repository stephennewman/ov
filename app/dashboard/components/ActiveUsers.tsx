'use client';

import { useOthers, useSelf } from '@/lib/liveblocks';
import { motion } from 'framer-motion';

export default function ActiveUsers() {
  // Check if Liveblocks is configured
  const hasLiveblocks = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY && 
                        process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY !== 'pk_demo';
  
  // Always call hooks (React requirement)
  const others = hasLiveblocks ? useOthers() : [];
  const self = hasLiveblocks ? useSelf() : null;

  // Show demo user if Liveblocks not configured
  if (!hasLiveblocks) {
    const demoUser = {
      name: 'Demo User',
      role: 'RN',
      color: '#22d3ee',
    };

    return (
      <div className="fixed right-6 top-24 flex flex-col gap-2 z-40">
        <div className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-2">
          Active Now (1)
        </div>
        <UserAvatar
          user={demoUser}
          activeItem={null}
          isCurrentUser
        />
        <div className="mt-2 text-xs text-zinc-500 max-w-[200px] text-right">
          Add Liveblocks key to see other users
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-6 top-24 flex flex-col gap-2 z-40">
      <div className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-2">
        Active Now ({others.length + 1})
      </div>

      {/* Self */}
      {self && (
        <UserAvatar
          user={self.presence.user}
          activeItem={self.presence.activeItem}
          isCurrentUser
        />
      )}

      {/* Others */}
      {others.map((other) => (
        <UserAvatar
          key={other.connectionId}
          user={other.presence.user}
          activeItem={other.presence.activeItem}
        />
      ))}
    </div>
  );
}

interface UserAvatarProps {
  user: {
    name: string;
    role: string;
    color: string;
    avatar?: string;
  };
  activeItem: { type: string; id: string; title: string } | null;
  isCurrentUser?: boolean;
}

function UserAvatar({ user, activeItem, isCurrentUser = false }: UserAvatarProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="group relative"
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 cursor-pointer transition-transform hover:scale-110"
        style={{
          backgroundColor: user.color,
          borderColor: isCurrentUser ? '#22d3ee' : user.color,
          boxShadow: isCurrentUser
            ? '0 0 20px rgba(34, 211, 238, 0.4)'
            : '0 0 10px rgba(0,0,0,0.5)',
        }}
      >
        {user.role}
      </div>

      {/* Tooltip */}
      <div className="absolute left-full ml-3 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        <div className="bg-white border border-zinc-200 rounded-lg p-3 shadow-xl">
          <div className="text-sm font-semibold text-zinc-900">{user.name}</div>
          <div className="text-xs text-zinc-600">{user.role}</div>
          {isCurrentUser && (
            <div className="text-xs text-cyan-600 mt-1">(You)</div>
          )}
          {activeItem && (
            <div className="mt-2 text-xs text-cyan-600 max-w-xs truncate">
              Currently: {activeItem.title}
            </div>
          )}
        </div>
      </div>

      {/* Activity pulse */}
      {activeItem && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
}

