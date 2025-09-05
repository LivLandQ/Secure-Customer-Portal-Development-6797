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
      color: 'bg-brand-teal',
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
          className="card-hover p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grey-400 font-helvetica">{stat.name}</p>
              <p className="text-3xl font-bold text-brand-grey mt-2 font-helvetica">{stat.value}</p>
              <p className="text-sm text-grey-400 mt-1 font-helvetica">{stat.change}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-brand`}>
              <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;