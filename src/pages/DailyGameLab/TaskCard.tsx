import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Modal from '../../components/Modal';
import { DailyTask } from '../../types';
import MorningReflection from './tasks/MorningReflection';
import SocialChallenge from './tasks/SocialChallenge';
import EveningJournal from './tasks/EveningJournal';

interface TaskCardProps {
  task: DailyTask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTaskComponent = () => {
    switch (task.id) {
      case '1':
        return <MorningReflection onComplete={() => setIsModalOpen(false)} />;
      case '2':
        return <SocialChallenge onComplete={() => setIsModalOpen(false)} />;
      case '3':
        return <EveningJournal onComplete={() => setIsModalOpen(false)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
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
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Complete
          </button>
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={task.title}
      >
        {getTaskComponent()}
      </Modal>
    </>
  );
};

export default TaskCard;