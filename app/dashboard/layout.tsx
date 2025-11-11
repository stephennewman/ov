'use client';

import { RoomProvider } from '@/lib/liveblocks';
import { AuthProvider } from './components/AuthProvider';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Check if Liveblocks is configured
  const hasLiveblocks = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY && 
                        process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY !== 'pk_demo';

  // In production, get user info from auth
  const user = {
    name: 'Demo User',
    role: 'RN',
    color: '#22d3ee',
  };

  // Wrap with AuthProvider first
  const content = <AuthProvider>{children}</AuthProvider>;

  // If no Liveblocks config, just render with auth
  if (!hasLiveblocks) {
    return content;
  }

  // Otherwise wrap with both AuthProvider and RoomProvider for real-time features
  return (
    <RoomProvider
      id="outcomeview-main-dashboard"
      initialPresence={{
        cursor: null,
        activeItem: null,
        user,
      }}
    >
      {content}
    </RoomProvider>
  );
}

