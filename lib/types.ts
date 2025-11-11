export type TaskStatus = 
  | 'not_started' 
  | 'in_progress' 
  | 'done' 
  | 'flagged' 
  | 'needs_approval' 
  | 'overdue';

export type UserRole = 'RN' | 'FD' | 'MD' | 'FOS' | 'Admin' | 'Tech';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  role_color: string;
  facility_id: string;
}

export interface Task {
  id: string;
  checklist_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assigned_to?: string;
  assigned_user?: Profile;
  due_date?: string;
  completed_at?: string;
  priority: number;
  requires_signature: boolean;
  requires_approval: boolean;
  proof_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  department?: Department;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  color: string;
  order_index: number;
}

export interface Checklist {
  id: string;
  title: string;
  department_id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'adhoc';
  facility_id: string;
  created_at: string;
  department?: Department;
  tasks?: Task[];
}

export interface ActivityLogItem {
  id: string;
  task_id: string;
  user_id: string;
  action: 'started' | 'completed' | 'updated' | 'flagged' | 'commented';
  previous_status?: string;
  new_status?: string;
  timestamp: string;
  user?: Profile;
  task?: Task;
}

export interface Collection {
  id: string;
  name: string;
  department_id: string;
  checklist_ids: string[];
  facility_id: string;
  department?: Department;
  completion_percentage?: number;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  facility_id: string;
  week_start: string;
  tasks_completed: number;
  streak_days: number;
  last_active: string;
  user?: Profile;
}

export interface UserPresence {
  cursor: { x: number; y: number } | null;
  activeItem: { type: string; id: string; title: string } | null;
  user: {
    name: string;
    role: UserRole;
    color: string;
    avatar?: string;
  };
}

