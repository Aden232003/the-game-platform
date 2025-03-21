import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import TaskWrapper from './TaskWrapper';
import { getDailyChallenge } from '../../../utils/challenges';

interface SocialChallengeProps {
  onComplete: () => void;
}

const SocialChallenge: React.FC<SocialChallengeProps> = ({ onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const challenge = getDailyChallenge();

  const handleComplete = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { error: logError } = await supabase
        .from('task_logs')
        .insert([{
          user_id: user.id,
          task_id: '2',
          completed_at: new Date().toISOString(),
          completion_date: new Date().toISOString().split('T')[0]
        }]);

      if (logError) throw logError;

      // Update user XP
      const { error: xpError } = await supabase
        .from('profiles')
        .update({ xp: user.xp + 10 })
        .eq('id', user.id);

      if (xpError) throw xpError;

      onComplete();
    } catch (err) {
      console.error('Error completing challenge:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TaskWrapper
      title="Today's Social Challenge"
      xpReward={10}
      isSubmitting={isSubmitting}
      onSubmit={handleComplete}
      buttonText="Mark as Complete"
    >
      <div className="bg-indigo-50 p-4 rounded-md">
        <p className="text-lg font-medium text-indigo-900">{challenge}</p>
      </div>
    </TaskWrapper>
  );
};