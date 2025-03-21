/*
  # Enhanced Features Migration

  1. New Tables
    - `achievements`: Track user achievements
    - `badges`: Available badges
    - `user_badges`: User's earned badges
    - `learning_paths`: Structured learning paths
    - `path_progress`: User progress in learning paths
    - `social_connections`: User connections/following
    - `activity_feed`: User activity feed
    - `challenges`: Time-limited challenges
    - `challenge_participants`: User participation in challenges
*/

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  xp_reward integer DEFAULT 50,
  icon_url text,
  created_at timestamptz DEFAULT now()
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon_url text,
  rarity text CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at timestamptz DEFAULT now()
);

-- Create user badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create learning paths table
CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  total_xp integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create path progress table
CREATE TABLE IF NOT EXISTS path_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  path_id uuid REFERENCES learning_paths(id) ON DELETE CASCADE,
  progress_percentage integer DEFAULT 0,
  completed_at timestamptz,
  started_at timestamptz DEFAULT now(),
  UNIQUE(user_id, path_id)
);

-- Create social connections table
CREATE TABLE IF NOT EXISTS social_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  following_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Create activity feed table
CREATE TABLE IF NOT EXISTS activity_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  activity_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  xp_reward integer DEFAULT 100,
  badge_id uuid REFERENCES badges(id),
  created_at timestamptz DEFAULT now()
);

-- Create challenge participants table
CREATE TABLE IF NOT EXISTS challenge_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid REFERENCES challenges(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  completed_at timestamptz,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

-- Enable RLS on all new tables
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE path_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;

-- Create policies for achievements and badges
CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for learning paths
CREATE POLICY "Anyone can view learning paths"
  ON learning_paths FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own path progress"
  ON path_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own path progress"
  ON path_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for social features
CREATE POLICY "Users can view own connections"
  ON social_connections FOR SELECT
  TO authenticated
  USING (auth.uid() = follower_id OR auth.uid() = following_id);

CREATE POLICY "Users can manage own connections"
  ON social_connections FOR ALL
  TO authenticated
  USING (auth.uid() = follower_id)
  WITH CHECK (auth.uid() = follower_id);

-- Create policies for activity feed
CREATE POLICY "Users can view own activity"
  ON activity_feed FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for challenges
CREATE POLICY "Anyone can view challenges"
  ON challenges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own challenge participation"
  ON challenge_participants FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own challenge participation"
  ON challenge_participants FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add indexes for better performance
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_path_progress_user_id ON path_progress(user_id);
CREATE INDEX idx_social_connections_follower_id ON social_connections(follower_id);
CREATE INDEX idx_social_connections_following_id ON social_connections(following_id);
CREATE INDEX idx_activity_feed_user_id ON activity_feed(user_id);
CREATE INDEX idx_challenge_participants_user_id ON challenge_participants(user_id); 