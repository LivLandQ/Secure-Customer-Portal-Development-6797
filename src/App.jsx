import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { RoleProvider } from './contexts/RoleContext';
import questConfig from './config/questConfig';
import QuestLogin from './components/auth/QuestLogin';
import QuestOnboarding from './components/auth/QuestOnboarding';
import Dashboard from './components/dashboard/Dashboard';
import UserManagement from './components/admin/UserManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <DataProvider>
          <RoleProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<QuestLogin />} />
                <Route path="/onboarding" element={<QuestOnboarding />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/users" element={<UserManagement />} />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </RoleProvider>
        </DataProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;