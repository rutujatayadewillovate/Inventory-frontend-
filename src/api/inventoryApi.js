// Inventory API placeholder
import axiosClient from "./axiosClient";

export const inventoryApi = {
  getStock: (params) => axiosClient.get("/inventory/stock", { params }),
  issueStock: (data) => axiosClient.post("/inventory/issue", data),
  adjustStock: (data) => axiosClient.post("/inventory/adjust", data),
  getTransactions: (params) =>
    axiosClient.get("/inventory/transactions", { params }),

  
};


 