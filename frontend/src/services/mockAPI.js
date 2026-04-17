import { mockData, createPaginatedResponse, findById } from './mockData';

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

class MockAPI {
  constructor() {
    this.data = JSON.parse(JSON.stringify(mockData)); // Deep copy
  }

  // Auth endpoints
  async login(email, password) {
    await delay();
    if (email === 'admin@erp.com' && password === 'Admin@123') {
      return {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        user: this.data.user,
      };
    }
    throw new Error('Invalid credentials');
  }

  async logout() {
    await delay();
    return { success: true };
  }

  async getCurrentUser() {
    await delay();
    return this.data.user;
  }

  async refreshToken(token) {
    await delay();
    return {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
    };
  }

  // Customers endpoints
  async getCustomers(page = 1, limit = 20) {
    await delay();
    return createPaginatedResponse(this.data.customers, page, limit);
  }

  async getCustomer(id) {
    await delay();
    return findById(this.data.customers, id);
  }

  async createCustomer(data) {
    await delay();
    const newCustomer = { _id: String(this.data.customers.length + 1), ...data };
    this.data.customers.push(newCustomer);
    return newCustomer;
  }

  async updateCustomer(id, data) {
    await delay();
    const idx = this.data.customers.findIndex(c => c._id === id);
    if (idx > -1) {
      this.data.customers[idx] = { ...this.data.customers[idx], ...data };
      return this.data.customers[idx];
    }
    throw new Error('Customer not found');
  }

  async deleteCustomer(id) {
    await delay();
    this.data.customers = this.data.customers.filter(c => c._id !== id);
    return { success: true };
  }

  // Products endpoints
  async getProducts(page = 1, limit = 20) {
    await delay();
    return createPaginatedResponse(this.data.products, page, limit);
  }

  async getProduct(id) {
    await delay();
    return findById(this.data.products, id);
  }

  async createProduct(data) {
    await delay();
    const newProduct = { _id: String(this.data.products.length + 1), ...data };
    this.data.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id, data) {
    await delay();
    const idx = this.data.products.findIndex(p => p._id === id);
    if (idx > -1) {
      this.data.products[idx] = { ...this.data.products[idx], ...data };
      return this.data.products[idx];
    }
    throw new Error('Product not found');
  }

  async deleteProduct(id) {
    await delay();
    this.data.products = this.data.products.filter(p => p._id !== id);
    return { success: true };
  }

  // Employees endpoints
  async getEmployees(page = 1, limit = 20) {
    await delay();
    return createPaginatedResponse(this.data.employees, page, limit);
  }

  async getEmployee(id) {
    await delay();
    return findById(this.data.employees, id);
  }

  async createEmployee(data) {
    await delay();
    const newEmployee = { _id: String(this.data.employees.length + 1), ...data };
    this.data.employees.push(newEmployee);
    return newEmployee;
  }

  async updateEmployee(id, data) {
    await delay();
    const idx = this.data.employees.findIndex(e => e._id === id);
    if (idx > -1) {
      this.data.employees[idx] = { ...this.data.employees[idx], ...data };
      return this.data.employees[idx];
    }
    throw new Error('Employee not found');
  }

  async deleteEmployee(id) {
    await delay();
    this.data.employees = this.data.employees.filter(e => e._id !== id);
    return { success: true };
  }

  // Suppliers endpoints
  async getSuppliers(page = 1, limit = 20) {
    await delay();
    return createPaginatedResponse(this.data.suppliers, page, limit);
  }

  async getSupplier(id) {
    await delay();
    return findById(this.data.suppliers, id);
  }

  async createSupplier(data) {
    await delay();
    const newSupplier = { _id: String(this.data.suppliers.length + 1), ...data };
    this.data.suppliers.push(newSupplier);
    return newSupplier;
  }

  async updateSupplier(id, data) {
    await delay();
    const idx = this.data.suppliers.findIndex(s => s._id === id);
    if (idx > -1) {
      this.data.suppliers[idx] = { ...this.data.suppliers[idx], ...data };
      return this.data.suppliers[idx];
    }
    throw new Error('Supplier not found');
  }

  async deleteSupplier(id) {
    await delay();
    this.data.suppliers = this.data.suppliers.filter(s => s._id !== id);
    return { success: true };
  }

  // Sales Orders endpoints
  async getSalesOrders(page = 1, limit = 20) {
    await delay();
    return createPaginatedResponse(this.data.salesOrders, page, limit);
  }

  async getSalesOrder(id) {
    await delay();
    return findById(this.data.salesOrders, id);
  }

  async createSalesOrder(data) {
    await delay();
    const newOrder = { _id: String(this.data.salesOrders.length + 1), ...data };
    this.data.salesOrders.push(newOrder);
    return newOrder;
  }

  async updateSalesOrder(id, data) {
    await delay();
    const idx = this.data.salesOrders.findIndex(o => o._id === id);
    if (idx > -1) {
      this.data.salesOrders[idx] = { ...this.data.salesOrders[idx], ...data };
      return this.data.salesOrders[idx];
    }
    throw new Error('Sales Order not found');
  }

  async deleteSalesOrder(id) {
    await delay();
    this.data.salesOrders = this.data.salesOrders.filter(o => o._id !== id);
    return { success: true };
  }

  // Purchase Orders endpoints
  async getPurchaseOrders(page = 1, limit = 20) {
    await delay();
    return createPaginatedResponse(this.data.purchaseOrders, page, limit);
  }

  async getPurchaseOrder(id) {
    await delay();
    return findById(this.data.purchaseOrders, id);
  }

  async createPurchaseOrder(data) {
    await delay();
    const newOrder = { _id: String(this.data.purchaseOrders.length + 1), ...data };
    this.data.purchaseOrders.push(newOrder);
    return newOrder;
  }

  async updatePurchaseOrder(id, data) {
    await delay();
    const idx = this.data.purchaseOrders.findIndex(o => o._id === id);
    if (idx > -1) {
      this.data.purchaseOrders[idx] = { ...this.data.purchaseOrders[idx], ...data };
      return this.data.purchaseOrders[idx];
    }
    throw new Error('Purchase Order not found');
  }

  async deletePurchaseOrder(id) {
    await delay();
    this.data.purchaseOrders = this.data.purchaseOrders.filter(o => o._id !== id);
    return { success: true };
  }

  // Dashboard endpoints
  async getDashboardStats() {
    await delay();
    return this.data.dashboardStats;
  }
}

export default new MockAPI();
