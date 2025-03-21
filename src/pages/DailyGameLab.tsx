import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { dailyTasksService } from '../services/dailyTasks';
import Modal from '../components/Modal';
import JournalEntry from '../components/JournalEntry';
import SocialChallenge from '../components/SocialChallenge';
import { Database } from '../types/supabase';

type DailyTask = Database['public']['Tables']['daily_tasks']['Row'];

const defaultTasks: DailyTask[] = [
  {
    id: 'morning-reflection',
    title: 'Morning Reflection',
    description: 'Write down your intentions for the day',
    xp_reward: 5,
    category: 'mindset',
    created_at: new Date().toISOString()
  },
  {
    id: 'social-challenge',
    title: 'Social Challenge',
    description: 'Start a conversation with someone new',
    xp_reward: 10,
    category: 'social',
    created_at: new Date().toISOString()
  },
  {
    id: 'evening-journal',
    title: 'Evening Journal',
    description: 'Reflect on your social interactions today',
    xp_reward: 5,
    category: 'reflection',
    created_at: new Date().toISOString()
  }
];

const DailyGameLab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, completedTasksData] = await Promise.all([
          dailyTasksService.getDailyTasks(),
          user ? dailyTasksService.getCompletedTasks(user.id, new Date().toISOString().split('T')[0]) : []
        ]);

        // If no tasks are found, use default tasks
        if (!tasksData || tasksData.length === 0) {
          console.log('No tasks found in database, using default tasks');
          setTasks(defaultTasks);
        } else {
          setTasks(tasksData);
        }
        
        setCompletedTasks(completedTasksData);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
        // Use default tasks as fallback
        setTasks(defaultTasks);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleCompleteTask = async (xp: number) => {
    if (!selectedTask || !user) return;

    try {
      await dailyTasksService.completeTask(user.id, selectedTask.id);
      setCompletedTasks(prev => [...prev, selectedTask.id]);
      setIsModalOpen(false);
      setSelectedTask(null);
      
      // Show success message
      alert(`Task completed! You earned ${xp} XP!`);
    } catch (err) {
      setError('Failed to complete task. Please try again.');
      console.error('Error completing task:', err);
    }
  };

  const renderTaskModal = () => {
    if (!selectedTask || !user) return null;

    switch (selectedTask.category) {
      case 'mindset':
        return (
          <JournalEntry
            userId={user.id}
            category="morning"
            onComplete={handleCompleteTask}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTask(null);
            }}
          />
        );
      case 'social':
        return (
          <SocialChallenge
            userId={user.id}
            onComplete={handleCompleteTask}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTask(null);
            }}
          />
        );
      case 'reflection':
        return (
          <JournalEntry
            userId={user.id}
            category="evening"
            onComplete={handleCompleteTask}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTask(null);
            }}
          />
        );
      default:
        return null;
    }
  };

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
          {tasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  isCompleted ? 'border-2 border-green-500' : ''
                }`}
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
                  {isCompleted ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle size={16} className="mr-1" /> Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsModalOpen(true);
                      }}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        title={selectedTask?.title || 'Complete Task'}
      >
        {renderTaskModal()}
      </Modal>
    </div>
  );
};

export default DailyGameLab;