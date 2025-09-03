import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiTool, FiCalendar, FiDollarSign } = FiIcons;

const StatsCards = () => {
  const { quotes, jobs, siteVisits, invoices } = useData();

  const stats = [
    {
      name: 'Active Quotes',
      value: quotes.filter(q => q.status !== 'draft').length,
      icon: FiFileText,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      name: 'Jobs in Progress',
      value: jobs.filter(j => j.status === 'in-progress').length,
      icon: FiTool,
      color: 'bg-green-500',
      change: '1 completing soon'
    },
    {
      name: 'Upcoming Visits',
      value: siteVisits.length,
      icon: FiCalendar,
      color: 'bg-purple-500',
      change: 'Next visit in 2 days'
    },
    {
      name: 'Pending Invoices',
      value: invoices.filter(i => i.status === 'pending').length,
      icon: FiDollarSign,
      color: 'bg-orange-500',
      change: '$3,200 total'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;