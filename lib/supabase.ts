import { createClient } from '@supabase/supabase-js';

// For demo purposes, we'll use mock data if no env vars are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Real-time subscription helper for tasks
export function subscribeToTasks(
  facilityId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`tasks:${facilityId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `facility_id=eq.${facilityId}`,
      },
      callback
    )
    .subscribe();
}

// Activity log subscription
export function subscribeToActivityLog(
  facilityId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`activity:${facilityId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'activity_log',
        filter: `facility_id=eq.${facilityId}`,
      },
      callback
    )
    .subscribe();
}

// Fetch tasks for facility
export async function fetchTasks(facilityId: string) {
  return supabase
    .from('tasks')
    .select(`
      *,
      assigned_user:profiles(*),
      department:departments(*)
    `)
    .eq('facility_id', facilityId)
    .order('created_at', { ascending: false });
}

// Fetch activity log
export async function fetchActivityLog(facilityId: string, limit = 20) {
  return supabase
    .from('activity_log')
    .select(`
      *,
      user:profiles(*),
      task:tasks(
        *,
        department:departments(*)
      )
    `)
    .eq('facility_id', facilityId)
    .order('timestamp', { ascending: false })
    .limit(limit);
}

// Update task status
export async function updateTaskStatus(
  taskId: string,
  status: string,
  userId: string
) {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', taskId)
    .select()
    .single();

  if (error) throw error;

  // Log the activity
  await supabase.from('activity_log').insert({
    task_id: taskId,
    user_id: userId,
    action: 'updated',
    new_status: status,
    timestamp: new Date().toISOString(),
  });

  return data;
}

