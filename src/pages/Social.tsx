import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, UserPlus, Activity } from 'lucide-react';

const Social: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'feed' | 'connections' | 'discover'>('feed');

  // Mock data - would be replaced with actual data from the database
  const mockConnections = [
    { id: '1', name: 'John Doe', xp: 1200, streak: 5 },
    { id: '2', name: 'Jane Smith', xp: 800, streak: 3 },
    { id: '3', name: 'Mike Johnson', xp: 1500, streak: 7 },
  ];

  const mockFeed = [
    {
      id: '1',
      user: { name: 'John Doe', xp: 1200 },
      action: 'completed',
      target: 'HTML Basics',
      xp: 50,
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      user: { name: 'Jane Smith', xp: 800 },
      action: 'earned',
      target: 'Week Warrior Achievement',
      xp: 200,
      timestamp: '3 hours ago',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Social Hub</h1>
        <p className="mt-2 text-gray-600">
          Connect with other learners, share your progress, and celebrate achievements together.
        </p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('feed')}
              className={`${
                activeTab === 'feed'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              <Activity className="mr-2 inline-block h-5 w-5" />
              Activity Feed
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`${
                activeTab === 'connections'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              <Users className="mr-2 inline-block h-5 w-5" />
              Connections
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              className={`${
                activeTab === 'discover'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              <UserPlus className="mr-2 inline-block h-5 w-5" />
              Discover
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'feed' && (
        <div className="space-y-6">
          {mockFeed.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-gray-900">{item.user.name}</span>
                  <span className="text-gray-600"> {item.action} </span>
                  <span className="font-medium text-gray-900">{item.target}</span>
                </div>
                <span className="text-sm text-gray-500">{item.timestamp}</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <span>+{item.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockConnections.map((connection) => (
            <div
              key={connection.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {connection.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {connection.xp} XP • {connection.streak} day streak
                  </p>
                </div>
                <button className="rounded-full bg-indigo-100 p-2 text-indigo-600 hover:bg-indigo-200">
                  <Users className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'discover' && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Find Learning Partners
          </h2>
          <p className="mt-2 text-gray-600">
            Connect with learners who share your interests and goals.
          </p>
          <div className="mt-6">
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Start Matching
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Social; 