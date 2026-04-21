import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import DashboardPage from '../pages/DashboardPage';
import LandingPage from '../pages/LandingPage';
import EventsPage from '../pages/EventsPage';
import GlobalEventsPage from '../pages/GlobalEventsPage';
import EventDetailPage from '../pages/EventDetailPage';
import BroadcastPage from '../pages/BroadcastPage';
import FeedbackPage from '../pages/FeedbackPage';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Protected Routes - With Sidebar/Header */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/events" element={<GlobalEventsPage />} />
          <Route path="/admin/broadcast" element={<BroadcastPage />} />
          <Route path="/admin/feedback" element={<FeedbackPage />} />
          {/* Add other protected routes here */}
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRouter;


