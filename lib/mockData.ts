import type { ActivityLogItem, Department, Task, Profile } from './types';

// Mock data for demo purposes when Supabase is not configured

export const mockUsers: Profile[] = [
  {
    id: 'user-1',
    email: 'sarah.chen@outcomeview.com',
    full_name: 'Sarah Chen',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'RN',
    role_color: '#22d3ee',
    facility_id: 'GEMD31',
  },
  {
    id: 'user-2',
    email: 'marcus.johnson@outcomeview.com',
    full_name: 'Marcus Johnson',
    avatar_url: '', // Will show initials
    role: 'FD',
    role_color: '#a855f7',
    facility_id: 'GEMD31',
  },
  {
    id: 'user-3',
    email: 'elena.rodriguez@outcomeview.com',
    full_name: 'Elena Rodriguez',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    role: 'MD',
    role_color: '#3b82f6',
    facility_id: 'GEMD31',
  },
  {
    id: 'user-4',
    email: 'james.kim@outcomeview.com',
    full_name: 'James Kim',
    avatar_url: '', // Will show initials
    role: 'FOS',
    role_color: '#f59e0b',
    facility_id: 'GEMD31',
  },
  {
    id: 'user-5',
    email: 'priya.patel@outcomeview.com',
    full_name: 'Priya Patel',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    role: 'Tech',
    role_color: '#22c55e',
    facility_id: 'GEMD31',
  },
];

export const mockDepartments: Department[] = [
  { id: '1', name: 'Clinical Operations', icon: 'Stethoscope', color: '#22d3ee', order_index: 1 },
  { id: '2', name: 'Facilities & Safety', icon: 'Building', color: '#a855f7', order_index: 2 },
  { id: '3', name: 'Radiology', icon: 'Activity', color: '#06b6d4', order_index: 3 },
  { id: '4', name: 'Administration', icon: 'FileText', color: '#f59e0b', order_index: 4 },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    checklist_id: 'checklist-1',
    title: 'Morning Equipment Check',
    description: 'Verify all imaging equipment is operational',
    status: 'done',
    assigned_to: 'user-1',
    assigned_user: mockUsers[0],
    priority: 1,
    requires_signature: false,
    requires_approval: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    department: mockDepartments[0],
  },
  {
    id: '2',
    checklist_id: 'checklist-1',
    title: 'Patient Safety Checklist Review',
    description: 'Review and update safety protocols',
    status: 'in_progress',
    assigned_to: 'user-2',
    assigned_user: mockUsers[1],
    priority: 2,
    requires_signature: true,
    requires_approval: false,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 300000).toISOString(),
    department: mockDepartments[0],
  },
  {
    id: '3',
    checklist_id: 'checklist-2',
    title: 'HVAC System Inspection',
    description: 'Monthly HVAC maintenance check',
    status: 'needs_approval',
    assigned_to: 'user-2',
    assigned_user: mockUsers[1],
    priority: 1,
    requires_signature: true,
    requires_approval: true,
    created_at: new Date(Date.now() - 14400000).toISOString(),
    updated_at: new Date(Date.now() - 600000).toISOString(),
    department: mockDepartments[1],
  },
  {
    id: '4',
    checklist_id: 'checklist-3',
    title: 'MRI Calibration',
    description: 'Quarterly MRI system calibration',
    status: 'overdue',
    assigned_to: 'user-3',
    assigned_user: mockUsers[2],
    priority: 3,
    requires_signature: true,
    requires_approval: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString(),
    department: mockDepartments[2],
  },
  {
    id: '5',
    checklist_id: 'checklist-4',
    title: 'Deposit Reconciliation',
    description: 'Daily financial deposit balance',
    status: 'done',
    assigned_to: 'user-4',
    assigned_user: mockUsers[3],
    priority: 1,
    requires_signature: false,
    requires_approval: true,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 900000).toISOString(),
    department: mockDepartments[3],
  },
  {
    id: '6',
    checklist_id: 'checklist-5',
    title: 'Emergency Equipment Check',
    description: 'Check all emergency response equipment',
    status: 'not_started',
    assigned_to: 'user-5',
    assigned_user: mockUsers[4],
    priority: 1,
    requires_signature: false,
    requires_approval: false,
    due_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date(Date.now() - 1800000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    department: mockDepartments[0],
  },
];

export const mockActivities: ActivityLogItem[] = [
  {
    id: '1',
    task_id: '1',
    user_id: 'user-1',
    action: 'completed',
    previous_status: 'in_progress',
    new_status: 'done',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    user: mockUsers[0],
    task: mockTasks[0],
  },
  {
    id: '2',
    task_id: '2',
    user_id: 'user-2',
    action: 'started',
    previous_status: 'not_started',
    new_status: 'in_progress',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    user: mockUsers[1],
    task: mockTasks[1],
  },
  {
    id: '3',
    task_id: '5',
    user_id: 'user-4',
    action: 'completed',
    previous_status: 'in_progress',
    new_status: 'done',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    user: mockUsers[3],
    task: mockTasks[4],
  },
  {
    id: '4',
    task_id: '3',
    user_id: 'user-2',
    action: 'updated',
    previous_status: 'in_progress',
    new_status: 'needs_approval',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    user: mockUsers[1],
    task: mockTasks[2],
  },
];

// Simulate new activities periodically
export function generateMockActivity(): ActivityLogItem {
  const randomTask = mockTasks[Math.floor(Math.random() * mockTasks.length)];
  const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  const actions: ActivityLogItem['action'][] = ['started', 'completed', 'updated', 'flagged'];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];

  return {
    id: `activity-${Date.now()}`,
    task_id: randomTask.id,
    user_id: randomUser.id,
    action: randomAction,
    new_status: randomTask.status,
    timestamp: new Date().toISOString(),
    user: randomUser,
    task: randomTask,
  };
}
