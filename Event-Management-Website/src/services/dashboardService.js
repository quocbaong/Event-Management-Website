import api from './api';
export const dashboardService = {
  getOverview: () => api.get('/organizer/dashboard/overview'),
  getRevenue: (groupBy = 'month') => api.get(`/organizer/dashboard/revenue?groupBy=${groupBy}`),
  getAttendees: () => api.get('/organizer/dashboard/attendees'),
};
