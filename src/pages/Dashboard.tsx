import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import { useAuth } from '../contexts/AuthContext';
import { features } from '../config/features';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userXP = (user as unknown as Profile)?.xp || 0;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(features.length / itemsPerPage);
  const currentFeatures = features.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full">
              <span className="font-semibold">{userXP}</span> XP
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="text-gray-600">
              Level {Math.floor(userXP / 100) + 1}
            </div>
          </div>
        </div>

        {/* Features Carousel */}
        <div className="relative">
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentFeatures.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    feature={{
                      ...feature,
                      title: feature.name,
                    }}
                    userXP={userXP}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;