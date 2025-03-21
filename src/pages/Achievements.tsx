import React from 'react';
import { achievements } from '../config/features';
import AchievementCard from '../components/AchievementCard';
import { useAuth } from '../contexts/AuthContext';

const Achievements: React.FC = () => {
  const { user } = useAuth();
  const [unlockedAchievements, setUnlockedAchievements] = React.useState<string[]>([]);

  // TODO: Fetch unlocked achievements from the database
  React.useEffect(() => {
    // This would be replaced with an actual API call
    const fetchUnlockedAchievements = async () => {
      // Simulated data
      setUnlockedAchievements(['first-task']);
    };

    if (user) {
      fetchUnlockedAchievements();
    }
  }, [user]);

  const handleClaimAchievement = async (achievementId: string) => {
    // TODO: Implement achievement claiming logic
    console.log('Claiming achievement:', achievementId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
        <p className="mt-2 text-gray-600">
          Track your progress and earn rewards for completing tasks and reaching milestones.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isUnlocked={unlockedAchievements.includes(achievement.id)}
            onClaim={() => handleClaimAchievement(achievement.id)}
          />
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-semibold text-gray-900">Progress Overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-sm font-medium text-gray-500">Total Achievements</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {achievements.length}
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-sm font-medium text-gray-500">Unlocked</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {unlockedAchievements.length}
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-sm font-medium text-gray-500">Completion Rate</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements; 