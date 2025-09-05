import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './components/auth/Login';
import PropertiesSummary from './components/properties/PropertiesSummary';
import DashboardWithProperty from './components/dashboard/DashboardWithProperty';
import { PropertyProvider } from './components/dashboard/PropertyContext';
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
              path="/properties"
              element={
                <ProtectedRoute>
                  <PropertiesSummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PropertyProvider>
                    <Layout>
                      <DashboardWithProperty />
                    </Layout>
                  </PropertyProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;