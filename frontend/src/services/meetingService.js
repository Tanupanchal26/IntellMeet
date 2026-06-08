import apiClient from './apiClient';

// Example service — extend as features grow
const meetingService = {
  getAll: () => apiClient.get('/meetings'),
  getById: (id) => apiClient.get(`/meetings/${id}`),
  create: (data) => apiClient.post('/meetings', data),
  update: (id, data) => apiClient.put(`/meetings/${id}`, data),
  remove: (id) => apiClient.delete(`/meetings/${id}`),
};

export default meetingService;
