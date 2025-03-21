import React from 'react';
import { learningPaths } from '../config/features';
import { useAuth } from '../contexts/AuthContext';

const LearningPaths: React.FC = () => {
  const { user } = useAuth();
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learning Paths</h1>
        <p className="mt-2 text-gray-600">
          Follow structured learning journeys to master new skills and earn rewards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path) => (
          <div
            key={path.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {path.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {path.description}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  path.difficulty === 'beginner'
                    ? 'bg-green-100 text-green-800'
                    : path.difficulty === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Total XP</span>
                <span className="font-semibold text-green-600">
                  +{path.totalXp}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setSelectedPath(path.id)}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Path
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPath && (
        <div className="mt-8 rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Path Details</h2>
          <div className="mt-4 space-y-6">
            {learningPaths
              .find((path) => path.id === selectedPath)
              ?.modules.map((module) => (
                <div
                  key={module.id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {module.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {module.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Tasks</h4>
                    <ul className="mt-2 space-y-2">
                      {module.tasks.map((task) => (
                        <li
                          key={task.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600">{task.title}</span>
                          <span className="font-medium text-green-600">
                            +{task.xpReward} XP
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPaths; 