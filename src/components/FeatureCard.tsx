import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Feature } from '../types';
import { Lock } from 'lucide-react';

interface FeatureCardProps {
  feature: Feature;
  userXP: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, userXP }) => {
  const isLocked = userXP < feature.requiredXP;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-lg shadow-lg overflow-hidden ${feature.color}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
          {isLocked && (
            <div className="flex items-center text-white">
              <Lock size={20} className="mr-2" />
              <span>{feature.requiredXP} XP required</span>
            </div>
          )}
        </div>
        <p className="text-white/90 mb-4">{feature.description}</p>
        {isLocked ? (
          <button 
            disabled 
            className="w-full bg-white/20 text-white py-2 px-4 rounded-md cursor-not-allowed"
          >
            Locked
          </button>
        ) : (
          <Link 
            to={feature.path}
            className="block w-full bg-white text-indigo-600 py-2 px-4 rounded-md text-center hover:bg-white/90 transition-colors"
          >
            Enter
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default FeatureCard;