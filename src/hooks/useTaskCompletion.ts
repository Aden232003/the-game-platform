import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useTaskCompletion = (taskId: string) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Check if task is already completed today
  useEffect(() => {
    const checkCompletion = async () => {
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('task_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('task_id', taskId)
        .eq('completion_date', today)
        .single();

      if (!error && data) {
        setIsCompleted(true);
      }
    };

    checkCompletion();
  }, [user, taskId]);

  const completeTask = async () => {
    if (!user || isCompleted || isLoading) return;

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const { error: logError } = await supabase
        .from('task_logs')
        .insert([
          {
            user_id: user.id,
            task_id: taskId,
            completed_at: new Date().toISOString(),
            completion_date: today
          },
        ]);

      if (logError) throw logError;

      // Update user XP
      const { error: xpError } = await supabase
        .from('profiles')
        .update({ xp: user.xp + 5 })
        .eq('id', user.id);

      if (xpError) throw xpError;

      setIsCompleted(true);
    } catch (err) {
      console.error('Error completing task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { completeTask, isCompleted, isLoading };
};