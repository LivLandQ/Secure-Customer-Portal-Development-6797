import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiFileText, FiTool, FiCalendar, FiDollarSign, FiMessageSquare, FiUpload, FiX } = FiIcons;

const Sidebar = ({ open, setOpen }) => {
  const { messages } = useData();
  const unreadCount = messages.filter(msg => !msg.read && msg.type === 'received').length;

  const navigation = [
    { name: 'Dashboard', icon: FiHome, current: true },
    { name: 'Quotes', icon: FiFileText, current: false },
    { name: 'Job Status', icon: FiTool, current: false },
    { name: 'Site Visits', icon: FiCalendar, current: false },
    { name: 'Invoices', icon: FiDollarSign, current: false },
    { name: 'Messages', icon: FiMessageSquare, current: false, badge: unreadCount },
    { name: 'File Upload', icon: FiUpload, current: false },
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -320 }}
        animate={{ x: open ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Customer Portal</h1>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900"
          >
            <SafeIcon icon={FiX} className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href="#"
                whileHover={{ x: 4 }}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  item.current
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <SafeIcon
                  icon={item.icon}
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </motion.a>
            ))}
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;