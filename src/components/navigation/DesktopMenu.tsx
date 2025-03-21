import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DesktopMenu: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="text-gray-700 hover:text-indigo-600">
        Home
      </Link>
      {user ? (
        <>
          <Link to="/daily-game-lab" className="text-gray-700 hover:text-indigo-600">
            Daily Game Lab
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Sign Out
          </button>
        </>
      ) : (
        <Link 
          to="/login" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default DesktopMenu;