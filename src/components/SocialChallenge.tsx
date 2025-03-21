import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SocialChallengeProps {
  userId: string;
  onComplete: (xp: number) => void;
  onClose: () => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    question: string;
    placeholder: string;
  }[];
}

const challenges: Challenge[] = [
  {
    id: 'conversation-starter',
    title: 'Start a Conversation',
    description: 'Approach someone new and start a meaningful conversation.',
    questions: [
      {
        id: 'approach',
        question: 'How did you approach the person?',
        placeholder: 'Describe your approach strategy...'
      },
      {
        id: 'topic',
        question: 'What topic did you discuss?',
        placeholder: 'Share the main topics of conversation...'
      },
      {
        id: 'outcome',
        question: 'How did the conversation go?',
        placeholder: 'Describe the outcome and any learnings...'
      }
    ]
  },
  {
    id: 'compliment-giver',
    title: 'Give a Genuine Compliment',
    description: 'Find an opportunity to give someone a sincere compliment.',
    questions: [
      {
        id: 'recipient',
        question: 'Who did you compliment?',
        placeholder: 'Describe the person and context...'
      },
      {
        id: 'compliment',
        question: 'What was your compliment?',
        placeholder: 'Share the compliment you gave...'
      },
      {
        id: 'reaction',
        question: 'How did they react?',
        placeholder: 'Describe their reaction and your feelings...'
      }
    ]
  },
  {
    id: 'group-participant',
    title: 'Join a Group Discussion',
    description: 'Participate in a group conversation or activity.',
    questions: [
      {
        id: 'group',
        question: 'What was the group activity?',
        placeholder: 'Describe the group and activity...'
      },
      {
        id: 'contribution',
        question: 'How did you contribute?',
        placeholder: 'Share your contributions to the discussion...'
      },
      {
        id: 'experience',
        question: 'What did you learn from the experience?',
        placeholder: 'Share your key learnings...'
      }
    ]
  }
];

const SocialChallenge: React.FC<SocialChallengeProps> = ({ userId, onComplete, onClose }) => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(
    challenges[Math.floor(Math.random() * challenges.length)]
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleComplete = async () => {
    // Check if all questions are answered
    const allAnswered = currentChallenge.questions.every(q => answers[q.id]?.trim());
    if (!allAnswered) return;

    setSaving(true);
    try {
      // Save challenge completion
      const { error } = await supabase
        .from('user_insights')
        .insert({
          user_id: userId,
          category: 'social_challenge',
          content: JSON.stringify({
            challenge: currentChallenge.title,
            answers
          })
        });

      if (error) throw error;

      // Award XP
      onComplete(10);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error saving challenge:', error);
    } finally {
      setSaving(false);
    }
  };

  const isComplete = currentChallenge.questions.every(q => answers[q.id]?.trim());

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
          {currentChallenge.title}
        </h3>
        <p className="text-indigo-700">{currentChallenge.description}</p>
      </div>

      <div className="space-y-6">
        {currentChallenge.questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {q.question}
            </label>
            <textarea
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleComplete}
          disabled={saving || !isComplete}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Challenge
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialChallenge; 