import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type DailyTask = Database['public']['Tables']['daily_tasks']['Row'];
type TaskLog = Database['public']['Tables']['task_logs']['Row'];

export const dailyTasksService = {
  async getDailyTasks() {
    const { data, error } = await supabase
      .from('daily_tasks')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as DailyTask[];
  },

  async getCompletedTasks(userId: string, date: string) {
    const { data, error } = await supabase
      .from('task_logs')
      .select('task_id')
      .eq('user_id', userId)
      .eq('completion_date', date);

    if (error) throw error;
    return data.map(log => log.task_id);
  },

  async completeTask(userId: string, taskId: string, reflection?: string, mood?: string) {
    // Start a transaction
    const { data: task, error: taskError } = await supabase
      .from('daily_tasks')
      .select('xp_reward')
      .eq('id', taskId)
      .single();

    if (taskError) throw taskError;

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

    if (logError) throw logError;

    // Update user XP
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ xp: task.xp_reward })
      .eq('id', userId)
      .select('xp')
      .single()
      .then(({ data: profile, error }) => {
        if (error) throw error;
        return supabase
          .from('profiles')
          .update({ xp: (profile?.xp || 0) + task.xp_reward })
          .eq('id', userId);
      });

    if (profileError) throw profileError;

    return task.xp_reward;
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

    if (error) throw error;
    return data as (TaskLog & { daily_tasks: DailyTask })[];
  }
}; 