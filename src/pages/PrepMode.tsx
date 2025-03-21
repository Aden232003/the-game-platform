import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const PrepMode: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Prep Mode</h1>
      <p className="text-gray-600 mb-8">
        Prepare yourself for success with structured learning sessions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Study Plans */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Plans</h2>
          <p className="text-gray-600">Create and follow personalized study plans.</p>
        </div>

        {/* Focus Timer */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Focus Timer</h2>
          <p className="text-gray-600">Use the Pomodoro timer to maintain focus during study sessions.</p>
        </div>

        {/* Progress Reports */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Reports</h2>
          <p className="text-gray-600">View detailed reports of your study sessions and progress.</p>
        </div>
      </div>
    </div>
  );
};

export default PrepMode; 