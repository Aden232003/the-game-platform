import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Growth is never by mere chance. It's the result of consistent effort and learning.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90">
            Life is a game. So are relationships. Start by taking the first step today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold text-lg hover:bg-white/90 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;