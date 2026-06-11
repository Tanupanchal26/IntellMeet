import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';

// ── Instance ────────────────────────────────────────────────────────────────
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 12000,
  withCredentials: true,
});

// ── Token refresh queue ─────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

// ── Request interceptor ─────────────────────────────────────────────────────
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor ────────────────────────────────────────────────────
axiosClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const original: AxiosRequestConfig & { _retry?: boolean } = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers = { ...original.headers, Authorization: `Bearer ${token}` };
          return axiosClient(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('im_refresh_token');
      if (!refreshToken) {
        isRefreshing = false;
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return Promise.reject(new Error('Session expired. Please log in again.'));
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
        const newToken: string = data.accessToken;
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken);
        // Notify Redux store via custom event (avoids circular import)
        window.dispatchEvent(new CustomEvent('auth:tokenRefreshed', { detail: newToken }));
        processQueue(null, newToken);
        original.headers = { ...original.headers, Authorization: `Bearer ${newToken}` };
        return axiosClient(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem('im_refresh_token');
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Normalise error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
