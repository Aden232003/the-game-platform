import React from 'react';
import { motion } from 'framer-motion';
import { useDailyTasks } from '../../hooks/useDailyTasks';
import DailyProgress from './DailyProgress';
import TaskList from './TaskList';

const DailyGameLab: React.FC = () => {
  const { tasks, isLoading, error } = useDailyTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
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

        <DailyProgress />
        <TaskList tasks={tasks} />
      </motion.div>
    </div>
  );
};

export default DailyGameLab;