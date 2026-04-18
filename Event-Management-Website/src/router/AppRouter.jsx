import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import DashboardPage from '../pages/DashboardPage';
import LandingPage from '../pages/LandingPage';
import EventsPage from '../pages/EventsPage';
import GlobalEventsPage from '../pages/GlobalEventsPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Protected Routes - With Sidebar/Header */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/events" element={<GlobalEventsPage />} />
          {/* Add other protected routes here */}
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

