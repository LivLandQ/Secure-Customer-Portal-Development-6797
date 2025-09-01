import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRole } from '../../contexts/RoleContext';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiPlus, FiEdit2, FiTrash2, FiShield, FiMail, FiPhone, FiCalendar } = FiIcons;

const UserManagement = () => {
  const { 
    users, 
    hasPermission, 
    updateUserRole, 
    updateUserStatus, 
    addUser, 
    deleteUser,
    getRoleDisplayName,
    getRoleColor 
  } = useRole();
  
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'customer',
    company: '',
    phone: ''
  });

  if (!hasPermission('canManageUsers')) {
    return (
      <div className="bg-brand-white rounded-xl shadow-sm border border-brand-accent p-8 text-center">
        <SafeIcon icon={FiShield} className="mx-auto h-12 w-12 text-brand-accent mb-4" />
        <h3 className="text-lg font-medium text-brand-primary mb-2 subheading">Access Restricted</h3>
        <p className="text-brand-text body-text">You don't have permission to manage users.</p>
      </div>
    );
  }

  const handleAddUser = (e) => {
    e.preventDefault();
    try {
      addUser({
        ...newUser,
        avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1472099645785-5658abf4ff4e' : '1494790108755-2616b332c2c2'}?w=150&h=150&fit=crop&crop=face`
      });
      setNewUser({ name: '', email: '', role: 'customer', company: '', phone: '' });
      setShowAddUser(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    try {
      updateUserRole(userId, newRole);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleStatusToggle = (userId, currentStatus) => {
    try {
      updateUserStatus(userId, currentStatus === 'active' ? 'inactive' : 'active');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        deleteUser(userId);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-brand-primary flex items-center heading-primary">
            <SafeIcon icon={FiUsers} className="mr-3 text-brand-primary" />
            User Management
          </h1>
          <p className="text-brand-text mt-2 body-text">Manage user accounts, roles, and permissions.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddUser(true)}
          className="bg-brand-primary text-brand-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 flex items-center btn-brand-primary subheading"
        >
          <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
          Add User
        </motion.button>
      </motion.div>

      {/* Add User Modal */}
      {showAddUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-brand-white rounded-xl p-6 w-full max-w-md mx-4 border border-brand-accent"
          >
            <h3 className="text-lg font-semibold text-brand-primary mb-4 subheading">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-1 form-text">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-accent rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary form-input-brand form-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-1 form-text">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-accent rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary form-input-brand form-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-1 form-text">Company</label>
                <input
                  type="text"
                  value={newUser.company}
                  onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-accent rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary form-input-brand form-text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-1 form-text">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-accent rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary form-input-brand form-text"
                >
                  <option value="customer">Customer</option>
                  <option value="manager">Project Manager</option>
                  <option value="admin">Administrator</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-brand-primary text-brand-white py-2 rounded-lg font-medium hover:bg-opacity-90 btn-brand-primary subheading"
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 bg-transparent text-brand-primary border border-brand-primary py-2 rounded-lg font-medium hover:bg-brand-primary hover:text-brand-white btn-brand-secondary subheading"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-white rounded-xl shadow-sm border border-brand-accent"
      >
        <div className="px-6 py-4 border-b border-brand-accent">
          <h2 className="text-lg font-semibold text-brand-primary subheading">All Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-accent uppercase tracking-wider form-text">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-accent uppercase tracking-wider form-text">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-accent uppercase tracking-wider form-text">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-accent uppercase tracking-wider form-text">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-accent uppercase tracking-wider form-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-brand-white divide-y divide-brand-accent">
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover border border-brand-accent"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-brand-primary subheading">{user.name}</div>
                        <div className="text-sm text-brand-text flex items-center body-text">
                          <SafeIcon icon={FiMail} className="mr-1 h-3 w-3 text-brand-accent" />
                          {user.email}
                        </div>
                        <div className="text-sm text-brand-text body-text">{user.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="px-2 py-1 rounded-full text-xs font-medium border border-brand-accent bg-brand-white text-brand-primary form-text"
                    >
                      <option value="customer">Customer</option>
                      <option value="manager">Project Manager</option>
                      <option value="admin">Administrator</option>
                      <option value="guest">Guest</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(user.id, user.status)}
                      className={`px-2 py-1 rounded-full text-xs font-medium form-text ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text body-text">
                    {user.lastLogin ? (
                      <div className="flex items-center">
                        <SafeIcon icon={FiCalendar} className="mr-1 h-3 w-3 text-brand-accent" />
                        {format(new Date(user.lastLogin), 'MMM dd, yyyy')}
                      </div>
                    ) : (
                      'Never'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingUser(user)}
                        className="text-brand-primary hover:text-brand-primary hover:opacity-80"
                      >
                        <SafeIcon icon={FiEdit2} className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default UserManagement;