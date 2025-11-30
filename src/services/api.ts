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
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', data),
  logout: () => {
    localStorage.removeItem('gescar_token');
  },
};

// Vehicles endpoints
export const vehiclesAPI = {
  getAll: (params?: { status?: string; year?: number; brand?: string }) =>
    api.get('/veiculos', { params }),
  getById: (id: string) => api.get(`/veiculos/${id}`),
  create: (data: VehicleData) => api.post('/veiculos', data),
  update: (id: string, data: Partial<VehicleData>) =>
    api.put(`/veiculos/${id}`, data),
  delete: (id: string) => api.delete(`/veiculos/${id}`),
};

// Dashboard endpoints
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/resumo'),
};

// Sales endpoints
export const salesAPI = {
  getAll: () => api.get('/vendas'),
  create: (data: SaleData) => api.post('/vendas', data),
};

// Repairs endpoints
export const repairsAPI = {
  getAll: () => api.get('/reparos'),
  create: (data: RepairData) => api.post('/reparos', data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/reparos/${id}/status`, { status }),
};

// Types
export interface VehicleData {
  model: string;
  brand: string;
  year: number;
  price: number;
  status: 'estoque' | 'vendido' | 'reparo';
  color?: string;
  mileage?: number;
  description?: string;
}

export interface SaleData {
  vehicleId: string;
  buyerName: string;
  buyerEmail: string;
  salePrice: number;
  paymentMethod: string;
}

export interface RepairData {
  vehicleId: string;
  description: string;
  estimatedCost: number;
  status: 'em_andamento' | 'concluido';
}

export default api;
