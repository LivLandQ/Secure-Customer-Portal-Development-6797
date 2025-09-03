import React from 'react';
import { motion } from 'framer-motion';
import StatsCards from './StatsCards';
import QuotesDashboard from './QuotesDashboard';
import JobTracker from './JobTracker';
import SiteVisits from './SiteVisits';
import InvoicesSummary from './InvoicesSummary';
import MessageCenter from './MessageCenter';
import FileUpload from './FileUpload';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your projects.</p>
      </motion.div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuotesDashboard />
        <JobTracker />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SiteVisits />
        <InvoicesSummary />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MessageCenter />
        <FileUpload />
      </div>
    </div>
  );
};

export default Dashboard;