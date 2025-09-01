import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTool, FiClock, FiCheckCircle } = FiIcons;

const JobTracker = () => {
  const { jobs } = useData();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return FiCheckCircle;
      case 'in-progress': return FiTool;
      default: return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiTool} className="mr-2 text-primary-500" />
          Job Status
        </h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900 flex items-center">
                  <SafeIcon 
                    icon={getStatusIcon(job.status)} 
                    className={`mr-2 h-4 w-4 ${getStatusColor(job.status)}`} 
                  />
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Team: {job.assignedTeam}
                </p>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {job.progress}%
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-2 rounded-full ${
                    job.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Started</p>
                <p className="font-medium">
                  {format(new Date(job.startDate), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">
                  {job.status === 'completed' ? 'Completed' : 'Est. Completion'}
                </p>
                <p className="font-medium">
                  {format(new Date(job.estimatedCompletion), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default JobTracker;