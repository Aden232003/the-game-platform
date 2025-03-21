import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircle } from 'lucide-react';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!user) return null;

  const email = user.email || '';
  const displayEmail = email.length > 15 
    ? `${email.substring(0, 15)}...` 
    : email;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
      >
        <UserCircle size={24} />
        <span>{displayEmail}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;