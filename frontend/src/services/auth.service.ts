import api from './api';

export const authService = {
  login: async (credentials: any) => {
    return api.post('/auth/login', credentials);
  },
  register: async (userData: any) => {
    return api.post('/auth/register', userData);
  },
  getProfile: async () => {
    return api.get('/user/profile');
  },
  updateProfile: async (profileData: any) => {
    return api.put('/user/profile', profileData);
  }
};

export default authService;
