import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type DailyTask = Database['public']['Tables']['daily_tasks']['Row'];
type TaskLog = Database['public']['Tables']['task_logs']['Row'];

const defaultTasks: DailyTask[] = [
  {
    id: 'morning-reflection',
    title: 'Morning Reflection',
    description: 'Write down your intentions for the day',
    xp_reward: 5,
    category: 'mindset',
    created_at: new Date().toISOString()
  },
  {
    id: 'social-challenge',
    title: 'Social Challenge',
    description: 'Start a conversation with someone new',
    xp_reward: 10,
    category: 'social',
    created_at: new Date().toISOString()
  },
  {
    id: 'evening-journal',
    title: 'Evening Journal',
    description: 'Reflect on your social interactions today',
    xp_reward: 5,
    category: 'reflection',
    created_at: new Date().toISOString()
  }
];

export const dailyTasksService = {
  async getDailyTasks() {
    const { data, error } = await supabase
      .from('daily_tasks')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      return defaultTasks;
    }
    return data as DailyTask[];
  },

  async getCompletedTasks(userId: string, date: string) {
    const { data, error } = await supabase
      .from('task_logs')
      .select('task_id')
      .eq('user_id', userId)
      .eq('completion_date', date);

    if (error) {
      console.error('Error fetching completed tasks:', error);
      return [];
    }
    return data.map(log => log.task_id);
  },

  async completeTask(userId: string, taskId: string, reflection?: string, mood?: string) {
    try {
      // First try to get the task from the database
      const { data: task, error: taskError } = await supabase
        .from('daily_tasks')
        .select('xp_reward')
        .eq('id', taskId)
        .single();

      // If task not found in database, use default task
      const xpReward = task?.xp_reward || defaultTasks.find(t => t.id === taskId)?.xp_reward || 5;

      // Insert task log
      const { error: logError } = await supabase
        .from('task_logs')
        .insert({
          user_id: userId,
          task_id: taskId,
          completion_date: new Date().toISOString().split('T')[0],
          reflection,
          mood
        });

      if (logError) {
        console.error('Error inserting task log:', logError);
        throw logError;
      }

      // Update user XP
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ xp: xpReward })
        .eq('id', userId)
        .select('xp')
        .single()
        .then(({ data: profile, error }) => {
          if (error) throw error;
          return supabase
            .from('profiles')
            .update({ xp: (profile?.xp || 0) + xpReward })
            .eq('id', userId);
        });

      if (profileError) {
        console.error('Error updating profile XP:', profileError);
        throw profileError;
      }

      return xpReward;
    } catch (err) {
      console.error('Error completing task:', err);
      throw err;
    }
  },

  async getTaskLogs(userId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('task_logs')
      .select(`
        *,
        daily_tasks (
          title,
          description,
          xp_reward
        )
      `)
      .eq('user_id', userId)
      .gte('completion_date', startDate)
      .lte('completion_date', endDate)
      .order('completion_date', { ascending: false });

    if (error) {
      console.error('Error fetching task logs:', error);
      return [];
    }
    return data as (TaskLog & { daily_tasks: DailyTask })[];
  }
}; 