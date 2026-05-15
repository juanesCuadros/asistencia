import axios from 'axios';

const api = axios.create({
  // URL base para conectarse al backend
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional: si más adelante agregas JWT/Tokens, se mandan solos aquí
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;