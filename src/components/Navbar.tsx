import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MobileMenu from './navigation/MobileMenu';
import FeatureNav from './navigation/FeatureNav';
import UserMenu from './navigation/UserMenu';
import { features } from '../config/features';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            The Game Platform
          </Link>

          {user && <FeatureNav features={features} />}

          <div className="hidden md:flex items-center space-x-4">
            <UserMenu />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && <MobileMenu features={features} onClose={() => setIsOpen(false)} />}
      </div>
    </nav>
  );
};

export default Navbar;