import { useEffect, useState, useCallback } from "react";
import inventoryApi from "../../api/inventoryApi";

const TYPE_STYLES = {
  RECEIVED: "bg-green-100 text-green-700",
  ISSUED: "bg-blue-100 text-blue-700",
  DAMAGED: "bg-amber-100 text-amber-700",
  LOST: "bg-red-100 text-red-700",
  ADJUSTMENT: "bg-slate-100 text-slate-700",
};

export default function MovementHistory({ refreshKey }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.getTransactions();
      setRows(data.items);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load movement history.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory,refreshKey]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-right">Change</th>
              <th className="px-4 py-3 text-right">New Stock</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-400">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-red-600">{error}</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-400">No movements found.</td></tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-slate-900">{row.productName}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_STYLES[row.type] || "bg-slate-100 text-slate-700"}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${row.quantityChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {row.quantityChange >= 0 ? `+${row.quantityChange}` : row.quantityChange}
                  </td>
                  <td className="px-4 py-3 text-right">{row.newStock}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate" title={row.reason || ""}>
                    {row.reason || "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{row.createdByUsername}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}