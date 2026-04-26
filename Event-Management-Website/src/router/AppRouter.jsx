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
import GlobalEventsPage from '../pages/GlobalEventsPage';
import BroadcastPage from '../pages/BroadcastPage';
import FeedbackPage from '../pages/FeedbackPage';
import SettingsPage from '../pages/SettingsPage';
import AttendeeDashboardPage from '../pages/AttendeeDashboardPage';
import AttendeeTicketsPage from '../pages/AttendeeTicketsPage';
import AttendeeEventsPage from '../pages/AttendeeEventsPage';
import AttendeeExplorePage from '../pages/AttendeeExplorePage';
import AttendeeQRPage from '../pages/AttendeeQRPage';
import AttendeeReviewPage from '../pages/AttendeeReviewPage';


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
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/events" element={<GlobalEventsPage />} />
          <Route path="/admin/broadcast" element={<BroadcastPage />} />
          <Route path="/admin/feedback" element={<FeedbackPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          {/* Add other protected routes here */}
        </Route>

        {/* Attendee Protected Routes - Separate Layout */}
        <Route element={<AttendeeLayout />}>
          <Route path="/attendee/dashboard" element={<AttendeeDashboardPage />} />
          <Route path="/attendee/tickets" element={<AttendeeTicketsPage />} />
          <Route path="/attendee/events" element={<AttendeeEventsPage />} />
          <Route path="/attendee/explore" element={<AttendeeExplorePage />} />
          <Route path="/attendee/qr" element={<AttendeeQRPage />} />
          <Route path="/attendee/reviews" element={<AttendeeReviewPage />} />
          {/* Add other attendee routes here: /attendee/tickets, /attendee/calendar, etc. */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;


