import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import questConfig from '../../config/questConfig';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle, FiArrowRight, FiUser } = FiIcons;

const QuestOnboardingPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get authentication data from localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    
    if (!storedUserId || !storedToken) {
      navigate('/login');
      return;
    }
    
    setUserId(storedUserId);
    setToken(storedToken);
  }, [navigate]);

  const getAnswers = () => {
    // Mark user as no longer new
    localStorage.setItem('isNewUser', 'false');
    
    // Navigate to main dashboard after onboarding completion
    navigate('/dashboard');
  };

  if (!userId || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Left Section - Welcome Message */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <SafeIcon icon={FiCheckCircle} className="text-4xl mr-4" />
              <h1 className="text-4xl font-bold">Welcome Aboard!</h1>
            </div>
            <h2 className="text-2xl font-light mb-6">
              Let's Get You Set Up
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              We're excited to have you join our customer portal. This quick setup will help us 
              personalize your experience and ensure you get the most out of our platform.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <SafeIcon icon={FiArrowRight} className="mr-3 text-green-200" />
                <span>Customize your dashboard preferences</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiArrowRight} className="mr-3 text-green-200" />
                <span>Set up project notifications</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiArrowRight} className="mr-3 text-green-200" />
                <span>Configure communication settings</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
      </div>

      {/* Right Section - Onboarding Component */}
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
                className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 lg:hidden"
              >
                <SafeIcon icon={FiUser} className="text-white text-2xl" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Quick Setup
              </h1>
              <p className="text-gray-600">
                Help us personalize your experience
              </p>
            </div>

            <div className="quest-onboarding-container" style={{ minHeight: '400px' }}>
              <OnBoarding
                userId={userId}
                token={token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestOnboardingPage;