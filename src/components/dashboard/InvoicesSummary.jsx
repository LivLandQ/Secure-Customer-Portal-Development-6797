import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiDownload, FiEye, FiCheckCircle, FiClock } = FiIcons;

const InvoicesSummary = () => {
  const { invoices } = useData();

  const getStatusIcon = (status) => {
    return status === 'paid' ? FiCheckCircle : FiClock;
  };

  const getStatusColor = (status) => {
    return status === 'paid' ? 'status-paid' : 'status-pending';
  };

  const downloadInvoice = (invoice) => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKEludm9pY2UpCi9DcmVhdG9yIChDdXN0b21lciBQb3J0YWwpCi9Qcm9kdWNlciAoQ3VzdG9tZXIgUG9ydGFsKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMTAxMTIwMDAwWikKL01vZERhdGUgKEQ6MjAyNDAxMDExMjAwMDBaKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2Jq';
    element.download = `${invoice.id}_invoice.pdf`;
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
          <SafeIcon icon={FiDollarSign} className="mr-2 text-brand-teal" />
          Invoices
        </h2>
        <button className="text-brand-teal hover:text-primary-600 text-sm font-medium font-helvetica">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice, index) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-100 rounded-brand p-4 card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <SafeIcon 
                    icon={getStatusIcon(invoice.status)} 
                    className={`mr-2 h-4 w-4 ${
                      invoice.status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`} 
                  />
                  <h3 className="font-medium text-brand-grey font-helvetica">{invoice.id}</h3>
                </div>
                <p className="text-sm text-grey-400 mt-1 font-helvetica">{invoice.description}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-lg font-semibold text-brand-grey font-helvetica">
                    ${invoice.amount.toLocaleString()}
                  </span>
                  <span className={getStatusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center mt-2 text-sm text-grey-400 font-helvetica">
                  <span>Due: {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
                  {invoice.paidDate && (
                    <span className="ml-4 text-green-600">
                      Paid: {format(new Date(invoice.paidDate), 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="icon-btn"
                  title="View Invoice"
                >
                  <SafeIcon icon={FiEye} className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadInvoice(invoice)}
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

export default InvoicesSummary;