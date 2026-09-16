import axiosClient from "./axiosClient";

export const inventoryApi = {
  getStock: (params = {}) =>
    axiosClient.get("/inventory/stock", { params }).then((res) => res.data),

  getTransactions: (params = {}) =>
    axiosClient.get("/inventory/transactions", { params }).then((res) => res.data),
};

export default inventoryApi;