import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // ✅ sans /api
});

// Injecte le token JWT dans chaque requête si disponible
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
