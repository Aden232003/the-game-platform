import { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Trophy,
  Users,
  Target,
  Award,
  GraduationCap,
  Calendar,
  Star,
  Brain,
  Lightbulb,
  BookMarked,
  Timer,
} from 'lucide-react';

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path: string;
  isNew?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: LucideIcon;
  requirements: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalXp: number;
  modules: {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    tasks: {
      id: string;
      title: string;
      description: string;
      xpReward: number;
    }[];
  }[];
}

export const features: Feature[] = [
  {
    id: 'daily-lab',
    name: 'Daily Lab',
    description: 'Complete daily learning tasks and build consistent habits',
    icon: Brain,
    color: 'daily-lab',
    path: '/daily-lab',
  },
  {
    id: 'prep-mode',
    name: 'Prep Mode',
    description: 'Prepare for upcoming challenges and assessments',
    icon: BookOpen,
    color: 'prep-mode',
    path: '/prep-mode',
  },
  {
    id: 'infield',
    name: 'Infield',
    description: 'Practice and apply your knowledge in real-world scenarios',
    icon: Target,
    color: 'infield',
    path: '/infield',
  },
  {
    id: 'vault',
    name: 'Vault',
    description: 'Access your saved resources and study materials',
    icon: BookMarked,
    color: 'vault',
    path: '/vault',
  },
  {
    id: 'arena',
    name: 'Arena',
    description: 'Compete in challenges and showcase your skills',
    icon: Trophy,
    color: 'arena',
    path: '/arena',
  },
  {
    id: 'social',
    name: 'Social',
    description: 'Connect with other learners and share your journey',
    icon: Users,
    color: 'indigo',
    path: '/social',
    isNew: true,
  },
  {
    id: 'achievements',
    name: 'Achievements',
    description: 'Track your progress and earn rewards',
    icon: Award,
    color: 'yellow',
    path: '/achievements',
    isNew: true,
  },
  {
    id: 'learning-paths',
    name: 'Learning Paths',
    description: 'Follow structured learning journeys',
    icon: GraduationCap,
    color: 'purple',
    path: '/learning-paths',
    isNew: true,
  },
];

export const achievements: Achievement[] = [
  {
    id: 'first-task',
    title: 'First Steps',
    description: 'Complete your first learning task',
    xpReward: 50,
    icon: Star,
    requirements: ['Complete 1 task'],
  },
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    xpReward: 200,
    icon: Calendar,
    requirements: ['Complete tasks for 7 consecutive days'],
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Connect with 5 other learners',
    xpReward: 150,
    icon: Users,
    requirements: ['Follow 5 other users'],
  },
];

export const badges: Badge[] = [
  {
    id: 'beginner',
    name: 'Beginner Badge',
    description: 'Earned when you complete your first task',
    icon: Star,
    rarity: 'common',
    requirements: ['Complete 1 task'],
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 30-day streak',
    icon: Calendar,
    rarity: 'epic',
    requirements: ['Complete tasks for 30 consecutive days'],
  },
  {
    id: 'social-champion',
    name: 'Social Champion',
    description: 'Connect with 20 other learners',
    icon: Users,
    rarity: 'rare',
    requirements: ['Follow 20 other users'],
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: 'web-development',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development',
    difficulty: 'beginner',
    totalXp: 1000,
    modules: [
      {
        id: 'html-basics',
        title: 'HTML Basics',
        description: 'Learn the fundamentals of HTML',
        xpReward: 200,
        tasks: [
          {
            id: 'html-structure',
            title: 'HTML Document Structure',
            description: 'Create a basic HTML document',
            xpReward: 50,
          },
          {
            id: 'html-elements',
            title: 'HTML Elements',
            description: 'Learn about common HTML elements',
            xpReward: 50,
          },
        ],
      },
      {
        id: 'css-basics',
        title: 'CSS Basics',
        description: 'Learn the fundamentals of CSS',
        xpReward: 200,
        tasks: [
          {
            id: 'css-selectors',
            title: 'CSS Selectors',
            description: 'Learn about CSS selectors',
            xpReward: 50,
          },
          {
            id: 'css-properties',
            title: 'CSS Properties',
            description: 'Learn about common CSS properties',
            xpReward: 50,
          },
        ],
      },
    ],
  },
];