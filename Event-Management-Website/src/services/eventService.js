import api from '../lib/axios';

export const eventService = {
  getEvents: () => api.get('/organizer/events'),

  getEvent: (id) => api.get(`/organizer/events/${id}`),

  createEvent: (data) => api.post('/organizer/events', data),

  updateEvent: (id, data) => api.put(`/organizer/events/${id}`, data),

  deleteEvent: (id) => api.delete(`/organizer/events/${id}`),

  publishEvent: (id, data) => api.patch(`/organizer/events/${id}/publish`, data),
};
