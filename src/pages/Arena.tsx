import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Target, Users, Timer } from 'lucide-react';

const Arena: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'challenges' | 'leaderboard' | 'tournaments'>('challenges');

  // Mock data - would be replaced with actual data from the database
  const mockChallenges = [
    {
      id: '1',
      title: 'Code Sprint',
      description: 'Complete 5 coding tasks in 24 hours',
      participants: 45,
      endDate: '2024-03-15',
      xpReward: 500,
      badge: 'Speed Demon',
    },
    {
      id: '2',
      title: 'Knowledge Master',
      description: 'Score 90% or higher in 3 quizzes',
      participants: 32,
      endDate: '2024-03-20',
      xpReward: 300,
      badge: 'Quiz Master',
    },
  ];

  const mockLeaderboard = [
    { id: '1', name: 'John Doe', xp: 2500, rank: 1 },
    { id: '2', name: 'Jane Smith', xp: 2300, rank: 2 },
    { id: '3', name: 'Mike Johnson', xp: 2100, rank: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Arena</h1>
        <p className="mt-2 text-gray-600">
          Compete in challenges, climb the leaderboard, and showcase your skills.
        </p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('challenges')}
              className={`${
                activeTab === 'challenges'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              <Target className="mr-2 inline-block h-5 w-5" />
              Challenges
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`${
                activeTab === 'leaderboard'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              <Trophy className="mr-2 inline-block h-5 w-5" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`${
                activeTab === 'tournaments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              <Users className="mr-2 inline-block h-5 w-5" />
              Tournaments
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'challenges' && (
        <div className="grid gap-6 md:grid-cols-2">
          {mockChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {challenge.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {challenge.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{challenge.participants}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-green-600">
                    <Trophy className="mr-1 h-4 w-4" />
                    <span>+{challenge.xpReward} XP</span>
                  </div>
                  <div className="flex items-center text-sm text-indigo-600">
                    <Target className="mr-1 h-4 w-4" />
                    <span>{challenge.badge}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Timer className="mr-1 h-4 w-4" />
                  <span>Ends {challenge.endDate}</span>
                </div>
              </div>

              <button className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Join Challenge
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="rounded-lg border border-gray-200 bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {mockLeaderboard.map((user) => (
                  <li key={user.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                          <span className="text-sm font-medium text-indigo-600">
                            {user.rank}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {user.xp} XP
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tournaments' && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Tournaments
          </h2>
          <p className="mt-2 text-gray-600">
            No tournaments scheduled at the moment. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default Arena; 