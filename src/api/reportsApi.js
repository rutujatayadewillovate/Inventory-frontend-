import axiosClient from './axiosClient';

export const reportsApi = {
  // Returns summary metrics
  getSummaryMetrics: async () => {
    try {
      const response = await axiosClient.get('/reports/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching summary metrics:', error);
      return { totalProducts: 0, lowStockCount: 0, totalStockValue: 0, totalSales: 0 };
    }
  },

  // Returns paginated low stock items (matching .NET PagedResult)
  getLowStockItems: async (page = 1, pageSize = 20) => {
    try {
      const response = await axiosClient.get(`/inventory/stock?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      return { items: [], totalCount: 0, page, pageSize };
    }
  },

  // Returns stock valuation list
  getStockValuation: async (page = 1, pageSize = 20) => {
    try {
      const response = await axiosClient.get(`/inventory/stock?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock valuation:', error);
      return { items: [], totalCount: 0, page, pageSize, grandTotal: 0 };
    }
  },

  // Returns movement history based on filters
  getMovementHistory: async (filters = {}) => {
    try {
      const response = await axiosClient.get('/inventory/transactions', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching movement history:', error);
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 20;
      return { items: [], totalCount: 0, page, pageSize };
    }
  }
};
