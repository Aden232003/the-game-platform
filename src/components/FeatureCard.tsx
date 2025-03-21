import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  color: string;
  isNew?: boolean;
}

interface FeatureCardProps {
  feature: Feature;
  userXP: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, userXP }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(feature.path)}
      className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${feature.color} text-white`}>
            <feature.icon className="w-6 h-6" />
          </div>
          {feature.isNew && (
            <span className="px-2 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-full">
              New
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 mb-4">{feature.description}</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium text-indigo-600">Enter</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;