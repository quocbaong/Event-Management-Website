import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import AttendeeLayout from '../components/layouts/AttendeeLayout';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import DashboardPage from '../pages/DashboardPage';
import LandingPage from '../pages/LandingPage';
import EventsPage from '../pages/EventsPage';
import EventDetailPage from '../pages/EventDetailPage';
import AttendeeDashboardPage from '../pages/AttendeeDashboardPage';


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
        
        {/* Organizer Protected Routes - With Sidebar/Header */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Add other organizer routes here */}
        </Route>

        {/* Attendee Protected Routes - Separate Layout */}
        <Route element={<AttendeeLayout />}>
          <Route path="/attendee/dashboard" element={<AttendeeDashboardPage />} />
          {/* Add other attendee routes here: /attendee/tickets, /attendee/calendar, etc. */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

