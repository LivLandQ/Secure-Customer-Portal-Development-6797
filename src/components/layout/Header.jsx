import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiLogOut, FiBell } = FiIcons;

const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <SafeIcon icon={FiMenu} className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 relative"
          >
            <SafeIcon icon={FiBell} className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </motion.button>

          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.company}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
            title="Sign out"
          >
            <SafeIcon icon={FiLogOut} className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;