import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Vault: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Vault</h1>
      <p className="text-gray-600 mb-8">
        Your personal collection of resources, notes, and achievements.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resources</h2>
          <p className="text-gray-600">Your saved learning materials will appear here.</p>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
          <p className="text-gray-600">Your personal notes and reflections will be stored here.</p>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
          <p className="text-gray-600">Track your progress and earned achievements here.</p>
        </div>
      </div>
    </div>
  );
};

export default Vault; 