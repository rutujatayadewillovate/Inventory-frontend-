import { useEffect, useState, useCallback } from "react";
import inventoryApi from "../api/inventoryApi";
import StockTable from "../components/inventory/StockTable";
import MovementHistory from "../components/inventory/MovementHistory";
import IssueStockForm from "../components/inventory/IssueStockForm";
import AdjustmentForm from "../components/inventory/AdjustmentForm";

export default function InventoryPage() {
  const [tab, setTab] = useState("stock");
  const [search, setSearch] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchStock = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.getStock({ search, lowStockOnly, pageSize: 100 });
      setRows(data.items);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load stock data.");
    } finally {
      setLoading(false);
    }
  }, [search, lowStockOnly]);

  useEffect(() => {
    if (tab === "stock") fetchStock();
  }, [tab, fetchStock, refreshKey]);

  const totalSkus = rows.length;
  const lowStockCount = rows.filter((r) => r.isLowStock && r.currentStock > 0).length;
  const outOfStockCount = rows.filter((r) => r.currentStock === 0).length;
  const totalUnits = rows.reduce((sum, r) => sum + r.currentStock, 0);

  const closeModal = () => setActiveModal(null);
  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Inventory</h1>
        </div>

        <div className="flex gap-6 border-b border-slate-200 mb-4">
          <button
            onClick={() => setTab("stock")}
            className={`pb-2 text-sm font-medium ${tab === "stock" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500"}`}
          >
            Current Stock
          </button>
          <button
            onClick={() => setTab("history")}
            className={`pb-2 text-sm font-medium ${tab === "history" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500"}`}
          >
            Movement History
          </button>
        </div>

        {tab === "stock" && (
          <>
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-white/80 backdrop-blur border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500">Total SKUs</div>
                <div className="text-lg font-bold">{totalSkus}</div>
              </div>
              <div className="flex-1 bg-white/80 backdrop-blur border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500">Low Stock</div>
                <div className="text-lg font-bold text-amber-600">{lowStockCount}</div>
              </div>
              <div className="flex-1 bg-white/80 backdrop-blur border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500">Out of Stock</div>
                <div className="text-lg font-bold text-red-600">{outOfStockCount}</div>
              </div>
              <div className="flex-1 bg-white/80 backdrop-blur border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500">Total Units</div>
                <div className="text-lg font-bold">{totalUnits}</div>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="flex items-center gap-2 text-sm text-slate-700 bg-white/90 border border-slate-300 rounded-md px-3">
                <input
                  type="checkbox"
                  checked={lowStockOnly}
                  onChange={(e) => setLowStockOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Low stock only
              </label>
            </div>

            <StockTable
              rows={rows}
              loading={loading}
              error={error}
              onIssue={(product) => setActiveModal({ mode: "issue", product })}
              onDamagedLost={(product) => setActiveModal({ mode: "damaged", product })}
              onAdjust={(product) => setActiveModal({ mode: "adjust", product })}
            />
          </>
        )}

        {tab === "history" && <MovementHistory refreshKey={refreshKey} />}

        {activeModal && activeModal.mode !== "adjust" && (
          <IssueStockForm
            product={activeModal.product}
            mode={activeModal.mode}
            onClose={closeModal}
            onSuccess={triggerRefresh}
          />
        )}

        {activeModal && activeModal.mode === "adjust" && (
          <AdjustmentForm
            product={activeModal.product}
            onClose={closeModal}
            onSuccess={triggerRefresh}
          />
        )}
      </div>
    </div>
  );
}