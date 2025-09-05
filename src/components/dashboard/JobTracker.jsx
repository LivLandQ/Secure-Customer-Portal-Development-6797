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
      case 'in-progress': return 'text-brand-teal';
      default: return 'text-grey-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-brand-grey flex items-center font-helvetica">
          <SafeIcon icon={FiTool} className="mr-2 text-brand-teal" />
          Job Status
        </h2>
        <button className="text-brand-teal hover:text-primary-600 text-sm font-medium font-helvetica">
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
            className="border border-gray-100 rounded-brand p-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-brand-grey flex items-center font-helvetica">
                  <SafeIcon 
                    icon={getStatusIcon(job.status)} 
                    className={`mr-2 h-4 w-4 ${getStatusColor(job.status)}`} 
                  />
                  {job.title}
                </h3>
                <p className="text-sm text-grey-400 mt-1 font-helvetica">
                  Team: {job.assignedTeam}
                </p>
              </div>
              <span className="text-sm font-medium text-brand-grey font-helvetica">
                {job.progress}%
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-grey-400 mb-1 font-helvetica">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-2 rounded-full ${
                    job.status === 'completed' ? 'bg-green-500' : 'bg-brand-teal'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-grey-400 font-helvetica">Started</p>
                <p className="font-medium text-brand-grey font-helvetica">
                  {format(new Date(job.startDate), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-grey-400 font-helvetica">
                  {job.status === 'completed' ? 'Completed' : 'Est. Completion'}
                </p>
                <p className="font-medium text-brand-grey font-helvetica">
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