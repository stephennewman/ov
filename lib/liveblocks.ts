import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

// For demo purposes, create a mock client if no API key is provided
const publicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || 'pk_demo';

const client = createClient({
  publicApiKey: publicKey,
  // Throttle cursor updates to improve performance
  throttle: 16, // ~60fps
});

type Presence = {
  cursor: { x: number; y: number } | null;
  activeItem: { type: string; id: string; title: string } | null;
  user: {
    name: string;
    role: string;
    color: string;
    avatar?: string;
  };
};

type Storage = {
  // For future collaborative editing features
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    role: string;
    color: string;
  };
};

type RoomEvent = {};

export const {
  RoomProvider,
  useMyPresence,
  useOthers,
  useSelf,
  useUpdateMyPresence,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);

