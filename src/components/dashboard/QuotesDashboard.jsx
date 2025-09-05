import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiDownload, FiEye } = FiIcons;

const QuotesDashboard = () => {
  const { quotes } = useData();

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'draft': return 'status-draft';
      default: return 'status-draft';
    }
  };

  const downloadPDF = (quote) => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFF1b3RlKQovQ3JlYXRvciAoQ3VzdG9tZXIgUG9ydGFsKQovUHJvZHVjZXIgKEN1c3RvbWVyIFBvcnRhbCkKL0NyZWF0aW9uRGF0ZSAoRDoyMDI0MDEwMTEyMDAwMFopCi9Nb2REYXRlIChEOjIwMjQwMTAxMTIwMDAwWikKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iago=';
    element.download = `${quote.id}_quote.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-brand-grey flex items-center font-helvetica">
          <SafeIcon icon={FiFileText} className="mr-2 text-brand-teal" />
          Quotes
        </h2>
        <button className="text-brand-teal hover:text-primary-600 text-sm font-medium font-helvetica">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {quotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-100 rounded-brand p-4 card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-brand-grey font-helvetica">{quote.title}</h3>
                <p className="text-sm text-grey-400 mt-1 font-helvetica">{quote.description}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-lg font-semibold text-green-600 font-helvetica">
                    ${quote.amount.toLocaleString()}
                  </span>
                  <span className={getStatusColor(quote.status)}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-grey-400 mt-1 font-helvetica">
                  {format(new Date(quote.date), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="icon-btn"
                  title="View Quote"
                >
                  <SafeIcon icon={FiEye} className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadPDF(quote)}
                  className="p-2 rounded-brand text-grey-400 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                  title="Download PDF"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuotesDashboard;