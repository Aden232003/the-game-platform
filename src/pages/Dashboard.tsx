import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import { useAuth } from '../contexts/AuthContext';
import { features } from '../config/features';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userXP = user?.xp || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="mt-2 text-gray-600">
            Current XP: <span className="font-semibold">{userXP}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              userXP={userXP}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;