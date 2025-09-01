import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../../contexts/AuthContext';
import questConfig from '../../config/questConfig';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiArrowRight } = FiIcons;

const QuestLoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = ({ userId, token, newUser }) => {
    // Store authentication data
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('isNewUser', newUser.toString());
    
    // Create user object for AuthContext
    const userData = {
      id: userId,
      email: 'user@questera.com',
      name: 'Questera User',
      company: 'Your Company',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    // Set user in context and localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Navigate based on user status
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
    
    // Reload to update auth context
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <SafeIcon icon={FiShield} className="text-4xl mr-4" />
              <h1 className="text-4xl font-bold">Customer Portal</h1>
            </div>
            <h2 className="text-2xl font-light mb-6">
              Welcome to Your Project Dashboard
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Access your quotes, track job progress, schedule site visits, and manage invoices all in one place. 
              Your construction projects, simplified.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <SafeIcon icon={FiArrowRight} className="mr-3 text-primary-200" />
                <span>Real-time project updates</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiArrowRight} className="mr-3 text-primary-200" />
                <span>Secure document management</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiArrowRight} className="mr-3 text-primary-200" />
                <span>Direct communication with your team</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
      </div>

      {/* Right Section - Authentication */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-4 lg:hidden"
              >
                <SafeIcon icon={FiShield} className="text-white text-2xl" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-gray-600">
                Access your customer dashboard
              </p>
            </div>

            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestLoginPage;