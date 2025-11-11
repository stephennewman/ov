'use client';

import { RoomProvider } from '@/lib/liveblocks';
import { ReactNode } from 'react';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const user = {
    name: 'Demo User',
    role: 'RN',
    color: '#22d3ee',
  };

  return (
    <RoomProvider
      id="outcomeview-feed"
      initialPresence={{
        cursor: null,
        activeItem: null,
        user,
      }}
    >
      {children}
    </RoomProvider>
  );
}

