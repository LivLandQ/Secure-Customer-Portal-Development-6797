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
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-brand-grey flex items-center font-helvetica">
          <SafeIcon icon={FiMessageSquare} className="mr-2 text-brand-teal" />
          Message Center
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCompose(!showCompose)}
          className="btn-primary text-sm"
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
          className="border border-gray-100 rounded-brand p-4 mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field"
            required
          />
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="input-field resize-none"
            rows="3"
            required
          />
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary text-sm flex items-center"
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
            className={`border rounded-brand p-3 cursor-pointer card-hover ${
              message.read ? 'border-gray-100' : 'border-primary-200 bg-primary-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <SafeIcon 
                    icon={message.read ? FiMailOpen : FiMail} 
                    className={`mr-2 h-4 w-4 ${
                      message.read ? 'text-grey-400' : 'text-brand-teal'
                    }`} 
                  />
                  <h3 className={`font-medium font-helvetica ${
                    message.read ? 'text-brand-grey' : 'text-brand-teal'
                  }`}>
                    {message.subject}
                  </h3>
                </div>
                <p className="text-sm text-grey-400 mt-1 font-helvetica">From: {message.sender}</p>
                <p className="text-sm text-grey-400 mt-1 line-clamp-2 font-helvetica">
                  {message.message}
                </p>
                <p className="text-xs text-grey-400 mt-2 font-helvetica">{message.timestamp}</p>
              </div>
              {!message.read && message.type === 'received' && (
                <div className="w-2 h-2 bg-brand-teal rounded-full ml-2 mt-1"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MessageCenter;