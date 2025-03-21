import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Feature } from '../../types';
import { Lock } from 'lucide-react';

interface FeatureNavProps {
  features: Feature[];
}

const FeatureNav: React.FC<FeatureNavProps> = ({ features }) => {
  const { user } = useAuth();
  const userXP = user?.xp || 0;

  return (
    <div className="hidden md:flex items-center space-x-8">
      {features.map((feature) => {
        const isLocked = userXP < feature.requiredXP;

        return (
          <div key={feature.id} className="relative group">
            <Link
              to={isLocked ? '#' : feature.path}
              className={`flex items-center space-x-1 ${
                isLocked 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <span>{feature.title}</span>
              {isLocked && <Lock size={16} />}
            </Link>
            {isLocked && (
              <div className="absolute hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-sm rounded-md -bottom-10 left-1/2 transform -translate-x-1/2">
                Unlock with {feature.requiredXP} XP
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FeatureNav;