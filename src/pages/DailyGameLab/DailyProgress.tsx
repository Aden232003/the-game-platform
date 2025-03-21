import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DailyProgress: React.FC = () => {
  const { user } = useAuth();
  const userXP = user?.xp || 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Daily Progress</h2>
        <div className="flex items-center text-yellow-600">
          <Trophy size={20} className="mr-2" />
          <span>{userXP} XP</span>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Daily Tasks</span>
            <span>2/3 Completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '66.67%' }}
              className="bg-indigo-600 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};