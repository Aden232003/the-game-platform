import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { dailyTasksService } from '../services/dailyTasks';
import Modal from '../components/Modal';
import { Database } from '../types/supabase';

type DailyTask = Database['public']['Tables']['daily_tasks']['Row'];

const DailyGameLab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completingTask, setCompletingTask] = useState(false);
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, completedTasksData] = await Promise.all([
          dailyTasksService.getDailyTasks(),
          user ? dailyTasksService.getCompletedTasks(user.id, new Date().toISOString().split('T')[0]) : []
        ]);
        setTasks(tasksData);
        setCompletedTasks(completedTasksData);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleCompleteTask = async () => {
    if (!selectedTask || !user) return;

    setCompletingTask(true);
    try {
      const xpReward = await dailyTasksService.completeTask(
        user.id,
        selectedTask.id,
        reflection,
        mood
      );
      
      setCompletedTasks(prev => [...prev, selectedTask.id]);
      setIsModalOpen(false);
      setReflection('');
      setMood('');
      
      // Show success message
      alert(`Task completed! You earned ${xpReward} XP!`);
    } catch (err) {
      setError('Failed to complete task. Please try again.');
      console.error('Error completing task:', err);
    } finally {
      setCompletingTask(false);
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
          setReflection('');
          setMood('');
        }}
        title={selectedTask?.title || 'Complete Task'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reflection
            </label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Share your thoughts about this task..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select your mood</option>
              <option value="excited">Excited</option>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="anxious">Anxious</option>
              <option value="tired">Tired</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleCompleteTask}
              disabled={completingTask}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {completingTask ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Completing...
                </>
              ) : (
                'Complete Task'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DailyGameLab;