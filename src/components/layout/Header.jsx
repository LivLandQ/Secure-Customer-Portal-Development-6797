import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../common/Logo';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiLogOut, FiBell } = FiIcons;

const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-brand-white shadow-sm border-b border-brand-accent">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-brand-accent hover:text-brand-primary hover:bg-gray-100 mr-4"
          >
            <SafeIcon icon={FiMenu} className="h-6 w-6" />
          </button>
          <Logo className="h-8 w-auto" />
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full text-brand-accent hover:text-brand-primary hover:bg-gray-100 relative"
          >
            <SafeIcon icon={FiBell} className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </motion.button>
          
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="h-8 w-8 rounded-full object-cover border border-brand-accent"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-brand-primary font-helvetica">{user?.name}</p>
              <p className="text-xs text-brand-accent">{user?.company}</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="p-2 rounded-md text-brand-accent hover:text-red-600 hover:bg-red-50"
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