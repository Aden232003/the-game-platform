import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Flask, Users, BookOpen, Swords } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 'prep-mode',
    title: 'Prep Mode',
    description: 'Get ready for social events with personalized preparation tools.',
    icon: 'Brain',
    color: 'bg-orange-600',
    requiredXP: 5,
    path: '/prep-mode'
  },
  {
    id: 'daily-game-lab',
    title: 'Daily Game Lab',
    description: 'Build consistent habits with daily exercises and challenges.',
    icon: 'Flask',
    color: 'bg-green-600',
    requiredXP: 0,
    path: '/daily-game-lab'
  },
  {
    id: 'infield',
    title: 'The Infield',
    description: 'Real-time tools for active social scenarios.',
    icon: 'Users',
    color: 'bg-red-600',
    requiredXP: 15,
    path: '/infield'
  },
  {
    id: 'vault',
    title: 'The Vault',
    description: 'Access our comprehensive library of resources and guides.',
    icon: 'BookOpen',
    color: 'bg-blue-600',
    requiredXP: 10,
    path: '/vault'
  },
  {
    id: 'arena',
    title: 'The Arena',
    description: 'Join the community to share experiences and learn together.',
    icon: 'Swords',
    color: 'bg-purple-600',
    requiredXP: 25,
    path: '/arena'
  }
];

const Home: React.FC = () => {
  // Mock user XP - this would come from your auth context in a real app
  const userXP = 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Gateway to Mastering the Game of Social Dynamics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Level up your social skills through gamified experiences, AI-driven personalization,
            and a supportive community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#features"
              className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-white/90"
            >
              Start Your Journey
            </a>
            <a
              href="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10"
            >
              Login / Register
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                userXP={userXP}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add testimonial cards here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;