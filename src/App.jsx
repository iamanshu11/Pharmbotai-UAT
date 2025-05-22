import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatPage from './pages/ChatPage';
import ProfileSettings from './pages/ProfileSettings';
import LoginPage from './pages/LoginPage';
import IntroPage from './pages/IntroPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';
import { setNavigateToLogin } from './services/apiService';
import { ChatProvider } from './context/ChatContext';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    setNavigateToLogin(() => (path = '/login') => {
      window.location.replace(path); // Redirect to login and replace history
    });
  }, []);

  // Check if user has seen intro
  const hasSeenIntro = localStorage.getItem('hasSeenIntro') === 'true';
  const isAuthenticated = localStorage.getItem('token') !== null;

  // If user hasn't seen intro and is not on intro page, redirect to intro
  useEffect(() => {
    if (!hasSeenIntro && location.pathname !== '/') {
      window.location.replace('/');
    }
  }, [hasSeenIntro, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route 
        path="/login" 
        element={
          hasSeenIntro ? <LoginPage /> : <Navigate to="/" />
        } 
      />
      <Route 
        path="/chat" 
        element={
          isAuthenticated ? <ChatPage /> : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/settings" 
        element={
          isAuthenticated ? <ProfileSettings /> : <Navigate to="/login" />
        } 
      />
      <Route path="/admin" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin" />
        } 
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Router>
          <AppContent />
        </Router>
      </ChatProvider>
    </ThemeProvider>
  );
}
