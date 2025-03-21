-- Drop existing tables if they exist
DROP TABLE IF EXISTS task_logs;
DROP TABLE IF EXISTS daily_tasks;
DROP TABLE IF EXISTS user_insights;
DROP TABLE IF EXISTS profiles;

-- Create daily_tasks table with TEXT id
CREATE TABLE daily_tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    xp_reward INTEGER NOT NULL DEFAULT 5,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create task_logs table
CREATE TABLE task_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    task_id TEXT NOT NULL REFERENCES daily_tasks(id),
    completion_date DATE NOT NULL,
    reflection TEXT,
    mood TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_insights table
CREATE TABLE user_insights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    xp INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default tasks
INSERT INTO daily_tasks (id, title, description, xp_reward, category)
VALUES 
    ('morning-reflection', 'Morning Reflection', 'Write down your intentions for the day', 5, 'mindset'),
    ('social-challenge', 'Social Challenge', 'Start a conversation with someone new', 10, 'social'),
    ('evening-journal', 'Evening Journal', 'Reflect on your social interactions today', 5, 'reflection')
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Daily tasks policies
CREATE POLICY "Daily tasks are viewable by everyone" ON daily_tasks
    FOR SELECT USING (true);

-- Task logs policies
CREATE POLICY "Users can view their own task logs" ON task_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own task logs" ON task_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User insights policies
CREATE POLICY "Users can view their own insights" ON user_insights
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own insights" ON user_insights
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, username, full_name)
    VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 