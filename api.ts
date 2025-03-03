import axios from "axios";
import {
  LoginCredentials,
  Item,
  Inventory,
  Customer,
  SalesOrder
} from "./types";

const API_BASE_URL = "https://your-api-url.com/api"; // Replace with actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // You might want to redirect to login page here
    }
    return Promise.reject(error);
  }
);

// Add request interceptor for authentication
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Auth APIs
export const authApi = {
  login: (credentials: LoginCredentials) => 
    api.post<{ token: string }>("/auth/login", credentials),
};

// Items APIs
export const itemsApi = {
  getAll: () => api.get<Item[]>("/items"),
  getById: (id: string) => api.get<Item>(`/items/${id}`),
  create: (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Item>("/items", data),
  update: (id: string, data: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>) => 
    api.put<Item>(`/items/${id}`, data),
  delete: (id: string) => api.delete(`/items/${id}`),
};

// Inventory APIs
export const inventoryApi = {
  getAll: () => api.get<Inventory[]>("/inventory"),
  getById: (id: string) => api.get<Inventory>(`/inventory/${id}`),
  create: (data: Omit<Inventory, 'id' | 'lastUpdated'>) => 
    api.post<Inventory>("/inventory", data),
  update: (id: string, data: Partial<Omit<Inventory, 'id' | 'lastUpdated'>>) => 
    api.put<Inventory>(`/inventory/${id}`, data),
  delete: (id: string) => api.delete(`/inventory/${id}`),
};

// Sales Orders APIs
export const salesOrdersApi = {
  getAll: () => api.get<SalesOrder[]>("/sales-orders"),
  getById: (id: string) => api.get<SalesOrder>(`/sales-orders/${id}`),
  create: (data: Omit<SalesOrder, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<SalesOrder>("/sales-orders", data),
  update: (id: string, data: Partial<Omit<SalesOrder, 'id' | 'createdAt' | 'updatedAt'>>) => 
    api.put<SalesOrder>(`/sales-orders/${id}`, data),
  delete: (id: string) => api.delete(`/sales-orders/${id}`),
};

// Customers APIs
export const customersApi = {
  getAll: () => api.get<Customer[]>("/customers"),
  getById: (id: string) => api.get<Customer>(`/customers/${id}`),
  create: (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Customer>("/customers", data),
  update: (id: string, data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>) => 
    api.put<Customer>(`/customers/${id}`, data),
  delete: (id: string) => api.delete(`/customers/${id}`),
};

export default api;