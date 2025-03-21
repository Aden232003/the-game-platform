/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`: User profiles with XP and streaks
    - `daily_tasks`: Available daily exercises
    - `task_logs`: Task completion records
    - `user_insights`: Personal notes and reflections

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  xp integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_daily_check timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create daily tasks table
CREATE TABLE IF NOT EXISTS daily_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  xp_reward integer DEFAULT 5,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create task logs table with completion date
CREATE TABLE IF NOT EXISTS task_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  task_id uuid REFERENCES daily_tasks(id) ON DELETE CASCADE,
  completed_at timestamp with time zone DEFAULT now(),
  completion_date date DEFAULT CURRENT_DATE,
  reflection text,
  mood text
);

-- Create unique constraint for one task completion per user per day
CREATE UNIQUE INDEX task_logs_user_task_date_idx ON task_logs (user_id, task_id, completion_date);

-- Create user insights table
CREATE TABLE IF NOT EXISTS user_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_insights ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Daily tasks policies (viewable by all authenticated users)
CREATE POLICY "Authenticated users can view tasks"
  ON daily_tasks FOR SELECT
  TO authenticated
  USING (true);

-- Task logs policies
CREATE POLICY "Users can view own task logs"
  ON task_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task logs"
  ON task_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User insights policies
CREATE POLICY "Users can manage own insights"
  ON user_insights FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);