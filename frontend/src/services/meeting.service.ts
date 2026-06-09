import api from './api';

export const meetingService = {
  getAll: async () => api.get('/meetings'),
  getById: async (id: string) => api.get(`/meetings/${id}`),
  create: async (data: any) => api.post('/meetings', data),
  update: async (id: string, data: any) => api.put(`/meetings/${id}`, data),
  remove: async (id: string) => api.delete(`/meetings/${id}`),
};

export default meetingService;
