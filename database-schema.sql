-- Outcomeview Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Facilities table
create table if not exists facilities (
  id text primary key,
  name text not null,
  location text,
  timezone text default 'America/New_York',
  created_at timestamp with time zone default now()
);

-- User profiles (extends Supabase auth.users)
create table if not exists profiles (
  id uuid references auth.users primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('RN', 'FD', 'MD', 'FOS', 'Admin', 'Tech')),
  role_color text,
  facility_id text references facilities(id),
  created_at timestamp with time zone default now()
);

-- Departments
create table if not exists departments (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  icon text,
  color text,
  order_index integer,
  created_at timestamp with time zone default now()
);

-- Checklists
create table if not exists checklists (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  department_id uuid references departments(id),
  type text check (type in ('daily', 'weekly', 'monthly', 'adhoc')),
  facility_id text references facilities(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Tasks
create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  checklist_id uuid references checklists(id) on delete cascade,
  title text not null,
  description text,
  status text check (status in ('not_started', 'in_progress', 'done', 'flagged', 'needs_approval', 'overdue')) default 'not_started',
  assigned_to uuid references profiles(id),
  due_date timestamp with time zone,
  completed_at timestamp with time zone,
  priority integer default 0,
  requires_signature boolean default false,
  requires_approval boolean default false,
  proof_url text,
  notes text,
  order_index integer,
  facility_id text references facilities(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Activity log (for live stream)
create table if not exists activity_log (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid references tasks(id) on delete cascade,
  user_id uuid references profiles(id),
  action text check (action in ('started', 'completed', 'updated', 'flagged', 'commented')),
  previous_status text,
  new_status text,
  timestamp timestamp with time zone default now(),
  facility_id text references facilities(id)
);

-- Collections (groupings of checklists)
create table if not exists collections (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  department_id uuid references departments(id),
  checklist_ids uuid[],
  facility_id text references facilities(id),
  created_at timestamp with time zone default now()
);

-- Leaderboard stats
create table if not exists leaderboard_stats (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  facility_id text references facilities(id),
  week_start date,
  tasks_completed integer default 0,
  streak_days integer default 0,
  last_active timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table tasks enable row level security;
alter table activity_log enable row level security;
alter table checklists enable row level security;
alter table collections enable row level security;
alter table leaderboard_stats enable row level security;

-- RLS Policies

-- Profiles: Users can read their own profile and others in same facility
create policy "Users can view profiles in their facility"
  on profiles for select
  using (
    facility_id in (
      select facility_id from profiles where id = auth.uid()
    )
  );

-- Tasks: Users can view tasks in their facility
create policy "Users can view facility tasks"
  on tasks for select
  using (
    facility_id in (
      select facility_id from profiles where id = auth.uid()
    )
  );

-- Tasks: Users can update tasks assigned to them
create policy "Users can update assigned tasks"
  on tasks for update
  using (assigned_to = auth.uid());

-- Activity log: Users can view facility activity
create policy "Users can view facility activity"
  on activity_log for select
  using (
    facility_id in (
      select facility_id from profiles where id = auth.uid()
    )
  );

-- Activity log: Users can insert their own activity
create policy "Users can log their own activity"
  on activity_log for insert
  with check (user_id = auth.uid());

-- Checklists: Users can view facility checklists
create policy "Users can view facility checklists"
  on checklists for select
  using (
    facility_id in (
      select facility_id from profiles where id = auth.uid()
    )
  );

-- Collections: Users can view facility collections
create policy "Users can view facility collections"
  on collections for select
  using (
    facility_id in (
      select facility_id from profiles where id = auth.uid()
    )
  );

-- Leaderboard: Users can view facility leaderboard
create policy "Users can view facility leaderboard"
  on leaderboard_stats for select
  using (
    facility_id in (
      select facility_id from profiles where id = auth.uid()
    )
  );

-- Create indexes for better performance
create index if not exists tasks_facility_id_idx on tasks(facility_id);
create index if not exists tasks_status_idx on tasks(status);
create index if not exists tasks_assigned_to_idx on tasks(assigned_to);
create index if not exists activity_log_facility_id_idx on activity_log(facility_id);
create index if not exists activity_log_timestamp_idx on activity_log(timestamp desc);

-- Enable real-time for live updates
alter publication supabase_realtime add table tasks;
alter publication supabase_realtime add table activity_log;

-- Insert sample data

-- Sample facility
insert into facilities (id, name, location) values
  ('GEMD31', 'Georgia Emergency Medical Diagnostic Center', 'Atlanta, GA')
on conflict (id) do nothing;

-- Sample departments
insert into departments (name, icon, color, order_index) values
  ('Clinical Operations', 'Stethoscope', '#22d3ee', 1),
  ('Facilities & Safety', 'Building', '#a855f7', 2),
  ('Radiology', 'Activity', '#06b6d4', 3),
  ('Administration', 'FileText', '#f59e0b', 4)
on conflict do nothing;

-- Sample profiles (you'll need to create auth users first)
-- This is just an example structure
-- insert into profiles (id, email, full_name, role, role_color, facility_id) values
--   ('user-uuid-here', 'maria@example.com', 'Maria Rodriguez', 'RN', '#22d3ee', 'GEMD31');

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for tasks updated_at
create trigger update_tasks_updated_at
  before update on tasks
  for each row
  execute function update_updated_at_column();

-- Trigger for checklists updated_at
create trigger update_checklists_updated_at
  before update on checklists
  for each row
  execute function update_updated_at_column();

-- Comments for documentation
comment on table profiles is 'User profiles with role-based information';
comment on table tasks is 'Individual checklist items with status tracking';
comment on table activity_log is 'Real-time activity feed for dashboard stream';
comment on table departments is 'Organizational departments (Clinical, Facilities, etc.)';
comment on table checklists is 'Operational checklists (daily, weekly, monthly)';
comment on table collections is 'Grouped checklists for progress tracking';
comment on table leaderboard_stats is 'Performance metrics and streaks';

-- Grant necessary permissions (if needed)
-- grant usage on schema public to anon, authenticated;
-- grant all on all tables in schema public to authenticated;
-- grant select on all tables in schema public to anon;

