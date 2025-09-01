import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiClock, FiUser } = FiIcons;

const SiteVisits = () => {
  const { siteVisits } = useData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiCalendar} className="mr-2 text-primary-500" />
          Upcoming Site Visits
        </h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {siteVisits.map((visit, index) => (
          <motion.div
            key={visit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{visit.title}</h3>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <SafeIcon icon={FiCalendar} className="mr-1 h-4 w-4" />
                    {format(new Date(visit.date), 'MMM dd, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiClock} className="mr-1 h-4 w-4" />
                    {visit.time}
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <SafeIcon icon={FiUser} className="mr-1 h-4 w-4" />
                  {visit.technician}
                </div>
              </div>
              <div className="ml-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {visit.type}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SiteVisits;