import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProperties } from '../../services/propertiesService';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiLogOut, FiArrowRight } = FiIcons;

const PropertiesSummary = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Extract username from email (part before @)
  const username = user?.email?.split('@')[0] || user?.name || 'User';

  useEffect(() => {
    loadProperties();
  }, [user]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      const userProperties = await getUserProperties(user.id);
      setProperties(userProperties);
      
      // Auto-redirect if user has only one property
      if (userProperties.length === 1) {
        setTimeout(() => {
          handlePropertySelect(userProperties[0]);
        }, 1000);
      }
    } catch (err) {
      setError('Failed to load properties. Please try again.');
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertySelect = (property) => {
    navigate(`/dashboard?propertyId=${property.id}`, {
      state: { property }
    });
  };

  const handleSignOut = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-grey-400 font-helvetica">Loading your properties...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal rounded-full mb-6"
          >
            <SafeIcon icon={FiHome} className="text-white text-2xl" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-brand-grey mb-3 font-helvetica">
            Welcome, {username}
          </h1>
          
          {properties.length === 1 ? (
            <p className="text-grey-400 font-helvetica">
              Redirecting you to your property dashboard...
            </p>
          ) : (
            <p className="text-grey-400 font-helvetica">
              Select a property to continue
            </p>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-700 p-4 rounded-brand text-center mb-8 font-helvetica"
          >
            {error}
          </motion.div>
        )}

        {/* Properties List */}
        {properties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="card p-6 card-hover cursor-pointer"
                onClick={() => handlePropertySelect(property)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <SafeIcon 
                        icon={FiHome} 
                        className="h-5 w-5 text-brand-teal mr-3" 
                      />
                      <h3 className="text-lg font-semibold text-brand-grey font-helvetica">
                        {property.address}
                      </h3>
                    </div>
                    
                    {property.propertyCode && (
                      <p className="text-sm text-grey-400 ml-8 font-helvetica">
                        Property Code: {property.propertyCode}
                      </p>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePropertySelect(property);
                    }}
                    className="btn-primary flex items-center"
                  >
                    Open
                    <SafeIcon icon={FiArrowRight} className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
                
                {properties.length === 1 && (
                  <div className="mt-4 flex justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-teal"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="bg-grey-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiHome} className="h-12 w-12 text-grey-400" />
            </div>
            
            <h2 className="text-xl font-semibold text-brand-grey mb-3 font-helvetica">
              No properties found
            </h2>
            
            <p className="text-grey-400 mb-8 font-helvetica max-w-md mx-auto">
              No properties are currently assigned to this account. 
              Please contact your property manager for assistance.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="btn-secondary flex items-center mx-auto"
            >
              <SafeIcon icon={FiLogOut} className="mr-2 h-4 w-4" />
              Sign Out
            </motion.button>
          </motion.div>
        )}

        {/* Sign Out Button (when properties exist) */}
        {properties.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleSignOut}
              className="text-grey-400 hover:text-brand-teal text-sm font-medium font-helvetica flex items-center mx-auto"
            >
              <SafeIcon icon={FiLogOut} className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertiesSummary;