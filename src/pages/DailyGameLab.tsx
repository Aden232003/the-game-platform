import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DailyGameLab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const mockTasks = [
    {
      id: '1',
      title: 'Morning Reflection',
      description: 'Write down your intentions for the day',
      xp_reward: 5,
      category: 'mindset'
    },
    {
      id: '2',
      title: 'Social Challenge',
      description: 'Start a conversation with someone new',
      xp_reward: 10,
      category: 'social'
    },
    {
      id: '3',
      title: 'Evening Journal',
      description: 'Reflect on your social interactions today',
      xp_reward: 5,
      category: 'reflection'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Daily Game Lab</h1>
          <p className="mt-2 text-gray-600">Complete daily exercises to level up your social skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  +{task.xp_reward} XP
                </span>
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock size={16} className="mr-1" /> Daily Task
                </span>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Complete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DailyGameLab;