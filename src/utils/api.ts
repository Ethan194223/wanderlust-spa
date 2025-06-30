// src/utils/api.ts
import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

/**
 * Central Axios instance.
 * – baseURL comes from Vite env (falls back to localhost)
 * – sends JWT (if present) on every request
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? 'http://localhost:3000',
  // withCredentials: true,          ← removed to avoid CORS pre-flight failure
});

// Attach the stored token automatically
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    } as any; // narrow cast avoids verbose typing
  }
  return config;
});

export default api;

