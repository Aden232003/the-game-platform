-- Insert daily tasks
INSERT INTO daily_tasks (id, title, description, xp_reward, category)
VALUES
  ('morning-reflection', 'Morning Reflection', 'Write down your intentions for the day', 5, 'mindset'),
  ('social-challenge', 'Social Challenge', 'Start a conversation with someone new', 10, 'social'),
  ('evening-journal', 'Evening Journal', 'Reflect on your social interactions today', 5, 'reflection')
ON CONFLICT (id) DO NOTHING; 