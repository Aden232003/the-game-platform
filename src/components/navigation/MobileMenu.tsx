import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock } from 'lucide-react';
import { Feature } from '../../types';

interface MobileMenuProps {
  features: Feature[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ features, onClose }) => {
  const { user, signOut } = useAuth();
  const userXP = user?.xp || 0;

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  if (!user) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link 
          to="/dashboard" 
          className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
          onClick={onClose}
        >
          Dashboard
        </Link>
        
        {features.map((feature) => {
          const isLocked = userXP < feature.requiredXP;
          
          return (
            <div key={feature.id} className="relative">
              <Link
                to={isLocked ? '#' : feature.path}
                onClick={onClose}
                className={`block px-3 py-2 ${
                  isLocked 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{feature.title}</span>
                  {isLocked && (
                    <div className="flex items-center text-sm">
                      <Lock size={16} className="mr-1" />
                      <span>{feature.requiredXP} XP</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}

        <button
          onClick={handleSignOut}
          className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;