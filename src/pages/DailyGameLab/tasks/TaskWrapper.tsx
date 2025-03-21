import React from 'react';
import { motion } from 'framer-motion';

interface TaskWrapperProps {
  title: string;
  xpReward: number;
  isSubmitting: boolean;
  onSubmit: () => void;
  children: React.ReactNode;
  buttonText?: string;
}

const TaskWrapper: React.FC<TaskWrapperProps> = ({
  title,
  xpReward,
  isSubmitting,
  onSubmit,
  children,
  buttonText = 'Submit'
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          +{xpReward} XP
        </span>
      </div>
      
      {children}
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`w-full px-4 py-2 rounded-md text-white transition-colors ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isSubmitting ? 'Processing...' : buttonText}
      </motion.button>
    </div>
  );
};