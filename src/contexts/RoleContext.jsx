import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

// Define role permissions
const ROLE_PERMISSIONS = {
  admin: {
    canViewAllProjects: true,
    canManageUsers: true,
    canEditQuotes: true,
    canDeleteFiles: true,
    canViewFinancials: true,
    canManageInvoices: true,
    canScheduleVisits: true,
    canViewReports: true,
    canManageSettings: true
  },
  manager: {
    canViewAllProjects: true,
    canManageUsers: false,
    canEditQuotes: true,
    canDeleteFiles: true,
    canViewFinancials: true,
    canManageInvoices: true,
    canScheduleVisits: true,
    canViewReports: true,
    canManageSettings: false
  },
  customer: {
    canViewAllProjects: false,
    canManageUsers: false,
    canEditQuotes: false,
    canDeleteFiles: false,
    canViewFinancials: true,
    canManageInvoices: false,
    canScheduleVisits: false,
    canViewReports: false,
    canManageSettings: false
  },
  guest: {
    canViewAllProjects: false,
    canManageUsers: false,
    canEditQuotes: false,
    canDeleteFiles: false,
    canViewFinancials: false,
    canManageInvoices: false,
    canScheduleVisits: false,
    canViewReports: false,
    canManageSettings: false
  }
};

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('customer');
  const [permissions, setPermissions] = useState(ROLE_PERMISSIONS.customer);
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'demo@customer.com',
      role: 'customer',
      company: 'Smith Construction Ltd',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      projects: ['Kitchen Renovation', 'Bathroom Remodel']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'manager',
      company: 'BuildPro Inc',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      projects: ['Office Renovation', 'Deck Installation']
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@admin.com',
      role: 'admin',
      company: 'System Admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      lastLogin: '2024-01-15T08:00:00Z',
      projects: []
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@guest.com',
      role: 'guest',
      company: 'Guest User',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'inactive',
      lastLogin: '2024-01-10T14:20:00Z',
      projects: []
    }
  ]);

  useEffect(() => {
    if (user) {
      // In a real app, you'd fetch the user's role from your backend
      const currentUser = users.find(u => u.email === user.email);
      const role = currentUser?.role || 'customer';
      setUserRole(role);
      setPermissions(ROLE_PERMISSIONS[role]);
    }
  }, [user, users]);

  const hasPermission = (permission) => {
    return permissions[permission] || false;
  };

  const updateUserRole = (userId, newRole) => {
    if (!hasPermission('canManageUsers')) {
      throw new Error('Insufficient permissions to manage users');
    }

    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, role: newRole }
        : user
    ));
  };

  const updateUserStatus = (userId, status) => {
    if (!hasPermission('canManageUsers')) {
      throw new Error('Insufficient permissions to manage users');
    }

    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status }
        : user
    ));
  };

  const addUser = (userData) => {
    if (!hasPermission('canManageUsers')) {
      throw new Error('Insufficient permissions to add users');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      status: 'active',
      lastLogin: null,
      projects: []
    };

    setUsers(prev => [...prev, newUser]);
  };

  const deleteUser = (userId) => {
    if (!hasPermission('canManageUsers')) {
      throw new Error('Insufficient permissions to delete users');
    }

    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      admin: 'Administrator',
      manager: 'Project Manager',
      customer: 'Customer',
      guest: 'Guest'
    };
    return roleNames[role] || role;
  };

  const getRoleColor = (role) => {
    const roleColors = {
      admin: 'bg-red-100 text-red-800',
      manager: 'bg-blue-100 text-blue-800',
      customer: 'bg-green-100 text-green-800',
      guest: 'bg-gray-100 text-gray-800'
    };
    return roleColors[role] || 'bg-gray-100 text-gray-800';
  };

  const value = {
    userRole,
    permissions,
    users,
    hasPermission,
    updateUserRole,
    updateUserStatus,
    addUser,
    deleteUser,
    getRoleDisplayName,
    getRoleColor,
    ROLE_PERMISSIONS
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};