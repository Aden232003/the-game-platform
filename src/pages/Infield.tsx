import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Infield: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Infield</h1>
      <p className="text-gray-600 mb-8">
        Practice and improve your skills with interactive exercises.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Practice Exercises */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Practice Exercises</h2>
          <p className="text-gray-600">Access a variety of practice exercises to enhance your skills.</p>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h2>
          <p className="text-gray-600">Monitor your improvement and track your practice sessions.</p>
        </div>

        {/* Skill Assessment */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skill Assessment</h2>
          <p className="text-gray-600">Take assessments to measure your current skill level.</p>
        </div>
      </div>
    </div>
  );
};

export default Infield; 