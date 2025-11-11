-- Create Test User for OutcomeView
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/qmpogeboufwkyotposyz/sql

-- Note: You need to create the auth user first via Supabase Dashboard
-- Then run this query with the user's ID

-- Step 1: Go to Authentication → Users → Add User
-- Email: test@outcomeview.com
-- Password: TestPass123!
-- Auto Confirm: YES

-- Step 2: Copy the user UUID from the auth.users table
-- Step 3: Replace 'USER_UUID_HERE' below with the actual UUID

-- Step 4: Run this query:
INSERT INTO profiles (id, email, full_name, role, role_color, facility_id)
VALUES (
  'USER_UUID_HERE', -- Replace with actual UUID from auth.users
  'test@outcomeview.com',
  'Test User',
  'RN',
  '#22d3ee',
  'GEMD31'
);

-- Optional: Create additional test users
-- Admin user
-- INSERT INTO profiles (id, email, full_name, role, role_color, facility_id)
-- VALUES (
--   'ADMIN_UUID_HERE',
--   'admin@outcomeview.com',
--   'Admin User',
--   'Admin',
--   '#71717a',
--   'GEMD31'
-- );

-- Facility Director
-- INSERT INTO profiles (id, email, full_name, role, role_color, facility_id)
-- VALUES (
--   'FD_UUID_HERE',
--   'director@outcomeview.com',
--   'Facility Director',
--   'FD',
--   '#a855f7',
--   'GEMD31'
-- );

