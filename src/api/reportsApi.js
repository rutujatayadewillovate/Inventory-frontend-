// Mock data for Dashboard & Reports
const mockProducts = [
  { productId: 1, sku: 'LTP-001', name: 'Dell XPS 13', currentStock: 4, reorderLevel: 10, isLowStock: true, price: 1200, category: 'Laptops' },
  { productId: 2, sku: 'LTP-002', name: 'MacBook Pro 14', currentStock: 15, reorderLevel: 10, isLowStock: false, price: 1999, category: 'Laptops' },
  { productId: 3, sku: 'MOU-001', name: 'Logitech MX Master 3', currentStock: 2, reorderLevel: 15, isLowStock: true, price: 99, category: 'Accessories' },
  { productId: 4, sku: 'MOU-002', name: 'Apple Magic Mouse', currentStock: 25, reorderLevel: 10, isLowStock: false, price: 79, category: 'Accessories' },
  { productId: 5, sku: 'MON-001', name: 'LG UltraGear 27', currentStock: 6, reorderLevel: 5, isLowStock: false, price: 299, category: 'Monitors' },
  { productId: 6, sku: 'KBD-001', name: 'Keychron K2', currentStock: 0, reorderLevel: 8, isLowStock: true, price: 89, category: 'Accessories' }
];

const mockTransactions = [
  { id: 101, productId: 1, productName: 'Dell XPS 13', type: 'Purchase', quantityChange: 10, previousStock: 2, newStock: 12, reason: null, referenceNo: 'PO-1001', createdByUsername: 'admin', createdAt: '2026-09-10T10:00:00Z' },
  { id: 102, productId: 3, productName: 'Logitech MX Master 3', type: 'Issue', quantityChange: -5, previousStock: 7, newStock: 2, reason: 'Sales Order', referenceNo: 'SO-2001', createdByUsername: 'staff1', createdAt: '2026-09-12T14:30:00Z' },
  { id: 103, productId: 1, productName: 'Dell XPS 13', type: 'Issue', quantityChange: -8, previousStock: 12, newStock: 4, reason: 'Sales Order', referenceNo: 'SO-2002', createdByUsername: 'staff2', createdAt: '2026-09-13T09:15:00Z' },
  { id: 104, productId: 6, productName: 'Keychron K2', type: 'Adjustment', quantityChange: -1, previousStock: 1, newStock: 0, reason: 'Damaged', referenceNo: null, createdByUsername: 'admin', createdAt: '2026-09-14T08:00:00Z' }
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const reportsApi = {
  // Returns summary metrics
  getSummaryMetrics: async () => {
    await delay(300); // Simulate network latency
    const totalProducts = mockProducts.length;
    const lowStockCount = mockProducts.filter(p => p.isLowStock).length;
    const totalStockValue = mockProducts.reduce((sum, p) => sum + (p.currentStock * p.price), 0);
    const totalSales = 12500; // Mock total sales metric

    return {
      totalProducts,
      lowStockCount,
      totalStockValue,
      totalSales
    };
  },

  // Returns paginated low stock items (matching .NET PagedResult)
  getLowStockItems: async (page = 1, pageSize = 20) => {
    await delay(300);
    const lowStock = mockProducts.filter(p => p.isLowStock);
    return {
      items: lowStock.slice((page - 1) * pageSize, page * pageSize),
      totalCount: lowStock.length,
      page,
      pageSize
    };
  },

  // Returns stock valuation list
  getStockValuation: async (page = 1, pageSize = 20) => {
    await delay(300);
    const items = mockProducts.map(p => ({
      ...p,
      stockValue: p.currentStock * p.price
    }));
    return {
      items: items.slice((page - 1) * pageSize, page * pageSize),
      totalCount: items.length,
      page,
      pageSize,
      grandTotal: items.reduce((sum, item) => sum + item.stockValue, 0)
    };
  },

  // Returns movement history based on filters
  getMovementHistory: async (filters = {}) => {
    await delay(400);
    let filtered = [...mockTransactions];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(t => t.productName.toLowerCase().includes(search) || (t.referenceNo && t.referenceNo.toLowerCase().includes(search)));
    }
    
    if (filters.type && filters.type !== 'All') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.createdAt) >= new Date(filters.startDate));
    }
    
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => new Date(t.createdAt) <= end);
    }

    // Sort by created date descending
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const page = filters.page || 1;
    const pageSize = filters.pageSize || 20;

    return {
      items: filtered.slice((page - 1) * pageSize, page * pageSize),
      totalCount: filtered.length,
      page,
      pageSize
    };
  }
};
