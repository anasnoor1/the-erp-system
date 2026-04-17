import axios from 'axios';
import mockAPI from './mockAPI';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance for real API
const realApi = axios.create({ baseURL: API_URL });

realApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

realApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return realApi(original);
      } catch {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Create a wrapper API object that works with both mock and real APIs
const api = USE_MOCK_DATA ? createMockApiWrapper() : realApi;

function createMockApiWrapper() {
  const wrapper = {
    interceptors: {
      request: { use: () => {} },
      response: { use: () => {} },
    },
    get: async (url, config) => {
      const response = await handleMockRequest('GET', url, undefined, config);
      return { data: response };
    },
    post: async (url, data, config) => {
      const response = await handleMockRequest('POST', url, data, config);
      return { data: response };
    },
    put: async (url, data, config) => {
      const response = await handleMockRequest('PUT', url, data, config);
      return { data: response };
    },
    delete: async (url, config) => {
      const response = await handleMockRequest('DELETE', url, undefined, config);
      return { data: response };
    },
  };
  return wrapper;
}

async function handleMockRequest(method, url, data, config) {
  // Remove /api prefix if present
  const cleanUrl = url.replace(/^\/api/, '');
  const parts = cleanUrl.split('/').filter(Boolean);

  try {
    // Auth endpoints
    if (cleanUrl === '/auth/login') {
      return await mockAPI.login(data.email, data.password);
    }
    if (cleanUrl === '/auth/logout') {
      return await mockAPI.logout();
    }
    if (cleanUrl === '/auth/me') {
      return await mockAPI.getCurrentUser();
    }
    if (cleanUrl === '/auth/refresh') {
      return await mockAPI.refreshToken(data.refreshToken);
    }

    // Customers
    if (cleanUrl === '/customers' && method === 'GET') {
      return await mockAPI.getCustomers(config?.params?.page, config?.params?.limit);
    }
    if (cleanUrl.match(/^\/customers\/\w+$/) && method === 'GET') {
      const id = parts[parts.length - 1];
      return await mockAPI.getCustomer(id);
    }
    if (cleanUrl === '/customers' && method === 'POST') {
      return await mockAPI.createCustomer(data);
    }
    if (cleanUrl.match(/^\/customers\/\w+$/) && method === 'PUT') {
      const id = parts[parts.length - 1];
      return await mockAPI.updateCustomer(id, data);
    }
    if (cleanUrl.match(/^\/customers\/\w+$/) && method === 'DELETE') {
      const id = parts[parts.length - 1];
      return await mockAPI.deleteCustomer(id);
    }

    // Products
    if (cleanUrl === '/products' && method === 'GET') {
      return await mockAPI.getProducts(config?.params?.page, config?.params?.limit);
    }
    if (cleanUrl.match(/^\/products\/\w+$/) && method === 'GET') {
      const id = parts[parts.length - 1];
      return await mockAPI.getProduct(id);
    }
    if (cleanUrl === '/products' && method === 'POST') {
      return await mockAPI.createProduct(data);
    }
    if (cleanUrl.match(/^\/products\/\w+$/) && method === 'PUT') {
      const id = parts[parts.length - 1];
      return await mockAPI.updateProduct(id, data);
    }
    if (cleanUrl.match(/^\/products\/\w+$/) && method === 'DELETE') {
      const id = parts[parts.length - 1];
      return await mockAPI.deleteProduct(id);
    }

    // Employees
    if (cleanUrl === '/employees' && method === 'GET') {
      return await mockAPI.getEmployees(config?.params?.page, config?.params?.limit);
    }
    if (cleanUrl.match(/^\/employees\/\w+$/) && method === 'GET') {
      const id = parts[parts.length - 1];
      return await mockAPI.getEmployee(id);
    }
    if (cleanUrl === '/employees' && method === 'POST') {
      return await mockAPI.createEmployee(data);
    }
    if (cleanUrl.match(/^\/employees\/\w+$/) && method === 'PUT') {
      const id = parts[parts.length - 1];
      return await mockAPI.updateEmployee(id, data);
    }
    if (cleanUrl.match(/^\/employees\/\w+$/) && method === 'DELETE') {
      const id = parts[parts.length - 1];
      return await mockAPI.deleteEmployee(id);
    }

    // Suppliers
    if (cleanUrl === '/suppliers' && method === 'GET') {
      return await mockAPI.getSuppliers(config?.params?.page, config?.params?.limit);
    }
    if (cleanUrl.match(/^\/suppliers\/\w+$/) && method === 'GET') {
      const id = parts[parts.length - 1];
      return await mockAPI.getSupplier(id);
    }
    if (cleanUrl === '/suppliers' && method === 'POST') {
      return await mockAPI.createSupplier(data);
    }
    if (cleanUrl.match(/^\/suppliers\/\w+$/) && method === 'PUT') {
      const id = parts[parts.length - 1];
      return await mockAPI.updateSupplier(id, data);
    }
    if (cleanUrl.match(/^\/suppliers\/\w+$/) && method === 'DELETE') {
      const id = parts[parts.length - 1];
      return await mockAPI.deleteSupplier(id);
    }

    // Sales Orders
    if (cleanUrl === '/sales-orders' && method === 'GET') {
      return await mockAPI.getSalesOrders(config?.params?.page, config?.params?.limit);
    }
    if (cleanUrl.match(/^\/sales-orders\/\w+$/) && method === 'GET') {
      const id = parts[parts.length - 1];
      return await mockAPI.getSalesOrder(id);
    }
    if (cleanUrl === '/sales-orders' && method === 'POST') {
      return await mockAPI.createSalesOrder(data);
    }
    if (cleanUrl.match(/^\/sales-orders\/\w+$/) && method === 'PUT') {
      const id = parts[parts.length - 1];
      return await mockAPI.updateSalesOrder(id, data);
    }
    if (cleanUrl.match(/^\/sales-orders\/\w+$/) && method === 'DELETE') {
      const id = parts[parts.length - 1];
      return await mockAPI.deleteSalesOrder(id);
    }

    // Purchase Orders
    if (cleanUrl === '/purchase-orders' && method === 'GET') {
      return await mockAPI.getPurchaseOrders(config?.params?.page, config?.params?.limit);
    }
    if (cleanUrl.match(/^\/purchase-orders\/\w+$/) && method === 'GET') {
      const id = parts[parts.length - 1];
      return await mockAPI.getPurchaseOrder(id);
    }
    if (cleanUrl === '/purchase-orders' && method === 'POST') {
      return await mockAPI.createPurchaseOrder(data);
    }
    if (cleanUrl.match(/^\/purchase-orders\/\w+$/) && method === 'PUT') {
      const id = parts[parts.length - 1];
      return await mockAPI.updatePurchaseOrder(id, data);
    }
    if (cleanUrl.match(/^\/purchase-orders\/\w+$/) && method === 'DELETE') {
      const id = parts[parts.length - 1];
      return await mockAPI.deletePurchaseOrder(id);
    }

    // Dashboard
    if (cleanUrl === '/dashboard/stats') {
      return await mockAPI.getDashboardStats();
    }

    throw new Error(`Mock endpoint not found: ${method} ${url}`);
  } catch (error) {
    throw new Error(error.message || `Mock request failed: ${method} ${url}`);
  }
}

export { USE_MOCK_DATA };
export default api;
