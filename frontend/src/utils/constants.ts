export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:5000/api';
export const SOCKET_URL = (import.meta.env.VITE_SOCKET_URL as string) || 'http://localhost:5000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  LOBBY: '/lobby',
  MEETING: '/meeting/:id',
  PROFILE: '/profile',
  NOT_FOUND: '*',
};
