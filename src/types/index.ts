export interface User {
  id: string;
  email: string;
  xp: number;
  created_at: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requiredXP: number;
  path: string;
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  category: string;
}

export interface TaskLog {
  id: string;
  user_id: string;
  task_id: string;
  completed_at: string;
  reflection?: string;
  mood?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  xp: number;
  created_at: string;
}