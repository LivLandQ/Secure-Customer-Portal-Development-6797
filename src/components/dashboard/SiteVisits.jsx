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
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-brand-grey flex items-center font-helvetica">
          <SafeIcon icon={FiCalendar} className="mr-2 text-brand-teal" />
          Upcoming Site Visits
        </h2>
        <button className="text-brand-teal hover:text-primary-600 text-sm font-medium font-helvetica">
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
            className="border border-gray-100 rounded-brand p-4 card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-brand-grey font-helvetica">{visit.title}</h3>
                <div className="flex items-center mt-2 space-x-4 text-sm text-grey-400 font-helvetica">
                  <div className="flex items-center">
                    <SafeIcon icon={FiCalendar} className="mr-1 h-4 w-4" />
                    {format(new Date(visit.date), 'MMM dd, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiClock} className="mr-1 h-4 w-4" />
                    {visit.time}
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-grey-400 font-helvetica">
                  <SafeIcon icon={FiUser} className="mr-1 h-4 w-4" />
                  {visit.technician}
                </div>
              </div>
              <div className="ml-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 font-helvetica">
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