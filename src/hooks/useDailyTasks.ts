import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DailyTask } from '../types';

export const useDailyTasks = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // First, check if we have any tasks
        const { data: existingTasks, error: checkError } = await supabase
          .from('daily_tasks')
          .select('*');

        if (checkError) throw checkError;

        // If no tasks exist, insert the initial tasks
        if (!existingTasks || existingTasks.length === 0) {
          const initialTasks = [
            {
              title: 'Morning Reflection',
              description: 'Write down your intentions for today',
              xp_reward: 5,
              category: 'mindset'
            },
            {
              title: 'Social Challenge',
              description: 'Start a conversation with someone new',
              xp_reward: 10,
              category: 'social'
            },
            {
              title: 'Evening Journal',
              description: 'Reflect on your social interactions today',
              xp_reward: 5,
              category: 'reflection'
            }
          ];

          const { error: insertError } = await supabase
            .from('daily_tasks')
            .insert(initialTasks);

          if (insertError) throw insertError;

          // Fetch the newly inserted tasks
          const { data: newTasks, error: fetchError } = await supabase
            .from('daily_tasks')
            .select('*')
            .order('created_at');

          if (fetchError) throw fetchError;
          setTasks(newTasks);
        } else {
          setTasks(existingTasks);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, isLoading, error };
};