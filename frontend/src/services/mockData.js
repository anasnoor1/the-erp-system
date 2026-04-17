// Mock Data for ERP System
export const mockData = {
  user: {
    id: '1',
    email: 'admin@erp.com',
    name: 'Admin User',
    role: 'admin',
  },

  customers: [
    { _id: '1', name: 'Acme Corporation', email: 'contact@acme.com', phone: '555-0101', company: 'Acme Corporation' },
    { _id: '2', name: 'TechStart Inc', email: 'info@techstart.com', phone: '555-0102', company: 'TechStart Inc' },
    { _id: '3', name: 'Global Imports Ltd', email: 'sales@globalimports.com', phone: '555-0103', company: 'Global Imports Ltd' },
    { _id: '4', name: 'Premier Services', email: 'contact@premier.com', phone: '555-0104', company: 'Premier Services' },
    { _id: '5', name: 'NextGen Solutions', email: 'info@nextgen.com', phone: '555-0105', company: 'NextGen Solutions' },
  ],

  products: [
    { _id: '1', sku: 'PROD-001', name: 'Laptop Pro 15', category: 'Electronics', costPrice: 800, sellingPrice: 1200, quantity: 25, reorderLevel: 5, description: 'High-performance laptop' },
    { _id: '2', sku: 'PROD-002', name: 'Wireless Mouse', category: 'Electronics', costPrice: 15, sellingPrice: 35, quantity: 150, reorderLevel: 20, description: 'USB wireless mouse' },
    { _id: '3', sku: 'PROD-003', name: 'Office Chair', category: 'Office', costPrice: 120, sellingPrice: 250, quantity: 40, reorderLevel: 10, description: 'Ergonomic office chair' },
    { _id: '4', sku: 'PROD-004', name: 'Desk Lamp LED', category: 'Office', costPrice: 25, sellingPrice: 60, quantity: 8, reorderLevel: 15, description: 'LED desk lamp with USB' },
    { _id: '5', sku: 'PROD-005', name: 'Notebook Pack', category: 'Office', costPrice: 5, sellingPrice: 12, quantity: 200, reorderLevel: 50, description: 'Pack of 10 notebooks' },
    { _id: '6', sku: 'PROD-006', name: 'Bluetooth Speaker', category: 'Electronics', costPrice: 40, sellingPrice: 99, quantity: 35, reorderLevel: 10, description: 'Portable bluetooth speaker' },
    { _id: '7', sku: 'PROD-007', name: 'USB-C Cable 2M', category: 'Electronics', costPrice: 3, sellingPrice: 9, quantity: 500, reorderLevel: 100, description: 'High-speed USB-C cable' },
    { _id: '8', sku: 'PROD-008', name: 'Monitor 27" 4K', category: 'Electronics', costPrice: 300, sellingPrice: 500, quantity: 12, reorderLevel: 3, description: '4K UHD monitor' },
  ],

  employees: [
    { _id: '1', name: 'John Smith', email: 'john.smith@erp.com', phone: '555-1001', position: 'Sales Manager', department: 'Sales', salary: 65000 },
    { _id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@erp.com', phone: '555-1002', position: 'Operations Lead', department: 'Operations', salary: 70000 },
    { _id: '3', name: 'Michael Chen', email: 'michael.chen@erp.com', phone: '555-1003', position: 'Inventory Specialist', department: 'Warehouse', salary: 55000 },
    { _id: '4', name: 'Emily Davis', email: 'emily.davis@erp.com', phone: '555-1004', position: 'Finance Officer', department: 'Finance', salary: 68000 },
    { _id: '5', name: 'Robert Wilson', email: 'robert.wilson@erp.com', phone: '555-1005', position: 'HR Manager', department: 'Human Resources', salary: 62000 },
  ],

  suppliers: [
    { _id: '1', name: 'Tech Wholesale Co', email: 'vendor@techwholes.com', phone: '555-2001', company: 'Tech Wholesale Co', address: '123 Trade St, Commerce City' },
    { _id: '2', name: 'Office Supply Direct', email: 'sales@officesupply.com', phone: '555-2002', company: 'Office Supply Direct', address: '456 Business Ave, Trade City' },
    { _id: '3', name: 'Global Electronics Dist', email: 'contact@globalelec.com', phone: '555-2003', company: 'Global Electronics Dist', address: '789 Industrial Blvd, Port City' },
    { _id: '4', name: 'Premium Furniture Ltd', email: 'orders@premiumfurn.com', phone: '555-2004', company: 'Premium Furniture Ltd', address: '321 Furniture Plaza, Design City' },
  ],

  salesOrders: [
    { _id: '1', orderNumber: 'SO-2024-001', customerId: '1', customer: 'Acme Corporation', totalAmount: 3600, status: 'delivered', date: '2024-04-01', items: [{ productId: '1', quantity: 3, price: 1200 }] },
    { _id: '2', orderNumber: 'SO-2024-002', customerId: '2', customer: 'TechStart Inc', totalAmount: 1340, status: 'processing', date: '2024-04-05', items: [{ productId: '2', quantity: 20, price: 35 }, { productId: '7', quantity: 100, price: 9 }] },
    { _id: '3', orderNumber: 'SO-2024-003', customerId: '3', customer: 'Global Imports Ltd', totalAmount: 2500, status: 'shipped', date: '2024-04-08', items: [{ productId: '8', quantity: 5, price: 500 }] },
    { _id: '4', orderNumber: 'SO-2024-004', customerId: '4', customer: 'Premier Services', totalAmount: 750, status: 'draft', date: '2024-04-10', items: [{ productId: '3', quantity: 3, price: 250 }] },
    { _id: '5', orderNumber: 'SO-2024-005', customerId: '5', customer: 'NextGen Solutions', totalAmount: 4400, status: 'delivered', date: '2024-04-12', items: [{ productId: '1', quantity: 2, price: 1200 }, { productId: '6', quantity: 30, price: 99 }] },
  ],

  purchaseOrders: [
    { _id: '1', orderNumber: 'PO-2024-001', supplierId: '1', supplier: 'Tech Wholesale Co', totalAmount: 16000, status: 'received', date: '2024-03-28', items: [{ productId: '1', quantity: 20, price: 800 }] },
    { _id: '2', orderNumber: 'PO-2024-002', supplierId: '2', supplier: 'Office Supply Direct', totalAmount: 3000, status: 'draft', date: '2024-04-10', items: [{ productId: '3', quantity: 10, price: 120 }, { productId: '5', quantity: 100, price: 5 }] },
    { _id: '3', orderNumber: 'PO-2024-003', supplierId: '3', supplier: 'Global Electronics Dist', totalAmount: 8000, status: 'received', date: '2024-03-15', items: [{ productId: '8', quantity: 10, price: 300 }] },
    { _id: '4', orderNumber: 'PO-2024-004', supplierId: '4', supplier: 'Premium Furniture Ltd', totalAmount: 1200, status: 'draft', date: '2024-04-09', items: [{ productId: '4', quantity: 40, price: 25 }] },
  ],

  dashboardStats: {
    revenue: 12450,
    salesCount: 5,
    totalProducts: 8,
    totalCustomers: 5,
    totalEmployees: 5,
    lowStock: 1,
    monthlySales: [
      { _id: 'January', total: 8500 },
      { _id: 'February', total: 10200 },
      { _id: 'March', total: 9800 },
      { _id: 'April', total: 12450 },
    ],
    topProducts: [
      { name: 'Laptop Pro 15', quantity: 10, revenue: 12000 },
      { name: 'Monitor 27" 4K', quantity: 8, revenue: 4000 },
      { name: 'Bluetooth Speaker', quantity: 25, revenue: 2475 },
    ],
  },

  journalEntries: [
    { _id: '1', date: '2024-04-01', description: 'Sales Order SO-2024-001 revenue', debit: 3600, credit: 0, category: 'Sales' },
    { _id: '2', date: '2024-04-05', description: 'Purchase Order PO-2024-002', debit: 0, credit: 3000, category: 'Purchases' },
    { _id: '3', date: '2024-04-08', description: 'Employee Salary Payment', debit: 0, credit: 320000, category: 'Payroll' },
    { _id: '4', date: '2024-04-10', description: 'Utility Payment', debit: 0, credit: 500, category: 'Expenses' },
  ],
};

// Helper function to generate paginated responses
export function createPaginatedResponse(data, page = 1, limit = 20) {
  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;
  return {
    data: data.slice(startIdx, endIdx),
    total: data.length,
    page,
    limit,
  };
}

// Helper function to find item by ID
export function findById(array, id) {
  return array.find(item => item._id === id);
}
