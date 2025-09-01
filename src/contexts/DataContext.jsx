import React, { createContext, useContext, useState } from 'react';
import { format, addDays, subDays } from 'date-fns';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [quotes] = useState([
    {
      id: 'Q-2024-001',
      title: 'Kitchen Renovation',
      amount: 15750,
      status: 'approved',
      date: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
      description: 'Complete kitchen renovation including cabinets, countertops, and appliances'
    },
    {
      id: 'Q-2024-002',
      title: 'Bathroom Remodel',
      amount: 8500,
      status: 'pending',
      date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      description: 'Master bathroom renovation with walk-in shower and vanity'
    },
    {
      id: 'Q-2024-003',
      title: 'Deck Installation',
      amount: 12200,
      status: 'draft',
      date: format(new Date(), 'yyyy-MM-dd'),
      description: 'Composite deck installation with railings and stairs'
    }
  ]);

  const [jobs] = useState([
    {
      id: 'J-2024-001',
      title: 'Kitchen Renovation',
      status: 'in-progress',
      progress: 65,
      startDate: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
      estimatedCompletion: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
      assignedTeam: 'Team Alpha'
    },
    {
      id: 'J-2024-002',
      title: 'Office Renovation',
      status: 'completed',
      progress: 100,
      startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
      estimatedCompletion: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
      assignedTeam: 'Team Beta'
    }
  ]);

  const [siteVisits] = useState([
    {
      id: 'SV-001',
      title: 'Kitchen Renovation - Final Inspection',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      time: '10:00 AM',
      type: 'Final Inspection',
      technician: 'Mike Johnson'
    },
    {
      id: 'SV-002',
      title: 'Deck Installation - Site Survey',
      date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
      time: '2:00 PM',
      type: 'Site Survey',
      technician: 'Sarah Wilson'
    }
  ]);

  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      amount: 5250,
      status: 'paid',
      dueDate: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
      description: 'Kitchen Renovation - Phase 1',
      paidDate: format(subDays(new Date(), 3), 'yyyy-MM-dd')
    },
    {
      id: 'INV-2024-002',
      amount: 3200,
      status: 'pending',
      dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
      description: 'Kitchen Renovation - Phase 2'
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Project Manager',
      subject: 'Kitchen Renovation Update',
      message: 'The kitchen renovation is progressing well. We\'ve completed the demolition phase and are starting the electrical work tomorrow.',
      timestamp: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm'),
      read: false,
      type: 'received'
    },
    {
      id: 2,
      sender: 'You',
      subject: 'Question about materials',
      message: 'Could you please confirm the countertop material we discussed? I want to make sure it matches our expectations.',
      timestamp: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm'),
      read: true,
      type: 'sent'
    }
  ]);

  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Kitchen_Plans_Final.pdf',
      size: '2.4 MB',
      uploadDate: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
      type: 'pdf',
      category: 'plans'
    },
    {
      id: 2,
      name: 'Material_Specifications.pdf',
      size: '1.8 MB',
      uploadDate: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
      type: 'pdf',
      category: 'specifications'
    }
  ]);

  const addMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      ...message,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm'),
      read: true,
      type: 'sent'
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markMessageAsRead = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const uploadFile = (file) => {
    const newFile = {
      id: Date.now(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: format(new Date(), 'yyyy-MM-dd'),
      type: file.type.includes('pdf') ? 'pdf' : 'image',
      category: 'uploaded'
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const value = {
    quotes,
    jobs,
    siteVisits,
    invoices,
    messages,
    files,
    addMessage,
    markMessageAsRead,
    uploadFile
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};