import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Routes>
      {/* Public routes */}
      <Route path="/" element={!user ? <Landing /> : <Navigate to="/home" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
      <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/home" />} />
      <Route path="/reset-password" element={!user ? <ResetPassword /> : <Navigate to="/home" />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      
      {/* Protected routes */}
      <Route path="/" element={user ? <Layout /> : <Navigate to="/" />}>
        <Route path="home" element={<Dashboard />} />
        <Route path="dashboard" element={<Navigate to="/home" />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
      </Routes>
    </Box>
  );
}

export default App;