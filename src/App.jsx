import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;