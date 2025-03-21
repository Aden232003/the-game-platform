import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import TaskWrapper from './TaskWrapper';

interface EveningJournalProps {
  onComplete: () => void;
}

const EveningJournal: React.FC<EveningJournalProps> = ({ onComplete }) => {
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user || !reflection.trim()) return;

    setIsSubmitting(true);
    try {
      const { error: logError } = await supabase
        .from('task_logs')
        .insert([{
          user_id: user.id,
          task_id: '3',
          reflection,
          completed_at: new Date().toISOString(),
          completion_date: new Date().toISOString().split('T')[0]
        }]);

      if (logError) throw logError;

      // Update user XP
      const { error: xpError } = await supabase
        .from('profiles')
        .update({ xp: user.xp + 5 })
        .eq('id', user.id);

      if (xpError) throw xpError;

      onComplete();
    } catch (err) {
      console.error('Error submitting reflection:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TaskWrapper
      title="Evening Journal"
      xpReward={5}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="What went well today? What could you improve for tomorrow?"
        className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
      />
    </TaskWrapper>
  );
};