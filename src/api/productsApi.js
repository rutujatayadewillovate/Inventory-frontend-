// Products API placeholder
import axiosClient from "./axiosClient";

export const productsApi = {
  getProducts: (params) => axiosClient.get("/products", { params }),
  getProductById: (id) => axiosClient.get(`/products/${id}`),
  createProduct: (data) => axiosClient.post("/products", data),
  updateProduct: (id, data) => axiosClient.put(`/products/${id}`, data),
  deleteProduct: (id) => axiosClient.delete(`/products/${id}`),
  checkSkuUnique: (sku, excludeId) =>
    axiosClient.get("/products/check-sku", { params: { sku, excludeId } }),
};
