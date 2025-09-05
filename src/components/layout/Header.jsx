import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiLogOut, FiBell } = FiIcons;

const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-card border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden icon-btn"
        >
          <SafeIcon icon={FiMenu} className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="icon-btn relative"
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
              <p className="text-sm font-medium text-brand-grey font-helvetica">{user?.name}</p>
              <p className="text-xs text-grey-400 font-helvetica">{user?.company}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="p-2 rounded-brand text-grey-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
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