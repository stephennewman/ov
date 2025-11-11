'use client';

import { useEffect, useState } from 'react';
import TVView2 from '../components/TVView2';
import type { ActivityLogItem } from '@/lib/types';
import { mockActivities, generateMockActivity } from '@/lib/mockData';

export default function TVDisplayPage() {
  const [activities, setActivities] = useState<ActivityLogItem[]>(mockActivities);

  // Simulate real-time activity updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = generateMockActivity();
      setActivities((prev) => [newActivity, ...prev].slice(0, 20));
    }, 8000); // New activity every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <TVView2 activities={activities} />
  );
}

