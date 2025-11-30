import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gescar_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('gescar_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  register: (data) =>
    api.post('/auth/register', data),
  logout: () => {
    localStorage.removeItem('gescar_token');
  },
};

// Vehicles endpoints
export const vehiclesAPI = {
  getAll: (params) =>
    api.get('/veiculos', { params }),
  getById: (id) => api.get(`/veiculos/${id}`),
  create: (data) => api.post('/veiculos', data),
  update: (id, data) =>
    api.put(`/veiculos/${id}`, data),
  delete: (id) => api.delete(`/veiculos/${id}`),
};

// Dashboard endpoints
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/resumo'),
};

// Sales endpoints
export const salesAPI = {
  getAll: () => api.get('/vendas'),
  create: (data) => api.post('/vendas', data),
};

// Repairs endpoints
export const repairsAPI = {
  getAll: () => api.get('/reparos'),
  create: (data) => api.post('/reparos', data),
  updateStatus: (id, status) =>
    api.patch(`/reparos/${id}/status`, { status }),
};

export default api;