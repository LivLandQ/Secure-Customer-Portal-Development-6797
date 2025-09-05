import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProperty } from './PropertyContext';
import Dashboard from './Dashboard';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiHome } = FiIcons;

const DashboardWithProperty = () => {
  const { selectedProperty, loading } = useProperty();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
      </div>
    );
  }

  const handleBackToProperties = () => {
    navigate('/properties');
  };

  return (
    <div>
      {/* Property Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-grey-50 border-b border-gray-100 px-6 py-4 mb-6 -mx-6 -mt-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <SafeIcon icon={FiHome} className="h-5 w-5 text-brand-teal mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-brand-grey font-helvetica">
                {selectedProperty?.address}
              </h2>
              {selectedProperty?.propertyCode && (
                <p className="text-sm text-grey-400 font-helvetica">
                  {selectedProperty.propertyCode}
                </p>
              )}
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToProperties}
            className="btn-ghost text-sm flex items-center"
          >
            <SafeIcon icon={FiArrowLeft} className="mr-2 h-4 w-4" />
            All Properties
          </motion.button>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <Dashboard />
    </div>
  );
};

export default DashboardWithProperty;