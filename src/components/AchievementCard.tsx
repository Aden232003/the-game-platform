import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../config/features';
import { LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  onClaim?: () => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isUnlocked,
  onClaim,
}) => {
  const Icon = achievement.icon as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-lg border p-4 ${
        isUnlocked
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`rounded-full p-2 ${
            isUnlocked ? 'bg-green-100' : 'bg-gray-100'
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              isUnlocked ? 'text-green-600' : 'text-gray-400'
            }`}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {achievement.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {achievement.description}
          </p>
          <div className="mt-2">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>XP Reward:</span>
              <span className="font-semibold text-green-600">
                +{achievement.xpReward}
              </span>
            </div>
            <ul className="mt-2 space-y-1">
              {achievement.requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isUnlocked ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          {isUnlocked && onClaim && (
            <button
              onClick={onClaim}
              className="mt-4 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Claim Achievement
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard; 