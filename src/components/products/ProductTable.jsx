import React, { useState, useEffect } from "react";
import { productsApi } from "../../api/productsApi";

export default function ProductList({ onEdit, onViewDetails, onAddNew }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productsApi.getProducts({
        search: searchTerm,
        categoryId: categoryFilter || undefined,
        status: statusFilter || undefined,
        pageNumber: page,
        pageSize: 10,
      });

      // Handle both camelCase and PascalCase backend responses safely
      const items =
        res?.data?.items ||
        res?.data?.Items ||
        (Array.isArray(res?.data) ? res.data : []);
      const pages = res?.data?.totalPages || res?.data?.TotalPages || 1;

      setProducts(items);
      setTotalPages(pages);
    } catch (err) {
      console.error("Failed to load products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, categoryFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Products</h2>
          <p className="text-sm text-slate-500">
            Manage your catalog, SKUs, and retail pricing
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Filter Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Search by name, SKU, brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></input>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Filter
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-700 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Price (₹)</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-slate-400">
                  Loading catalog...
                </td>
              </tr>
            ) : !products || products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-slate-400">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const sellPrice = p.sellingPrice ?? p.selling_price ?? 0;
                const costPrice = p.purchasePrice ?? p.purchase_price ?? 0;
                const stock = p.currentStock ?? p.current_stock ?? 0;
                const reorder = p.reorderLevel ?? p.reorder_level ?? 5;
                const prodStatus = p.status || "ACTIVE";

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {p.brand || "No Brand"} •{" "}
                        {p.modelNumber || p.model_number || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">
                      {p.sku}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">
                        ₹{Number(sellPrice).toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        Cost: ₹{Number(costPrice).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          stock <= reorder
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {stock} units
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          prodStatus === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {prodStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => onViewDetails && onViewDetails(p.id)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit && onEdit(p)}
                        className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
