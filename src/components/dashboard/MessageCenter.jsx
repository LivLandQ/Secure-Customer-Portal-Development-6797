import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiSend, FiMail, FiMailOpen } = FiIcons;

const MessageCenter = () => {
  const { messages, addMessage, markMessageAsRead } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [showCompose, setShowCompose] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && subject.trim()) {
      addMessage({
        subject,
        message: newMessage
      });
      setNewMessage('');
      setSubject('');
      setShowCompose(false);
    }
  };

  const handleMessageClick = (message) => {
    if (!message.read && message.type === 'received') {
      markMessageAsRead(message.id);
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
          <SafeIcon icon={FiMessageSquare} className="mr-2 text-primary-500" />
          Message Center
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCompose(!showCompose)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600"
        >
          {showCompose ? 'Cancel' : 'Compose'}
        </motion.button>
      </div>

      {showCompose && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSendMessage}
          className="border border-gray-200 rounded-lg p-4 mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows="3"
            required
          />
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 flex items-center"
            >
              <SafeIcon icon={FiSend} className="mr-2 h-4 w-4" />
              Send Message
            </motion.button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleMessageClick(message)}
            className={`border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${
              message.read ? 'border-gray-200' : 'border-primary-200 bg-primary-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <SafeIcon 
                    icon={message.read ? FiMailOpen : FiMail} 
                    className={`mr-2 h-4 w-4 ${
                      message.read ? 'text-gray-400' : 'text-primary-500'
                    }`} 
                  />
                  <h3 className={`font-medium ${
                    message.read ? 'text-gray-900' : 'text-primary-900'
                  }`}>
                    {message.subject}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">From: {message.sender}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {message.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">{message.timestamp}</p>
              </div>
              {!message.read && message.type === 'received' && (
                <div className="w-2 h-2 bg-primary-500 rounded-full ml-2 mt-1"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MessageCenter;