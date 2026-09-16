import { useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function AdjustmentForm({ product, onClose, onSuccess }) {
  const [newCount, setNewCount] = useState(product.currentStock);
  const [reason, setReason] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const diff = Number(newCount) - product.currentStock;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const count = Number(newCount);
    if (count < 0 || Number.isNaN(count)) {
      setError("Enter a valid, non-negative count.");
      return;
    }
    if (!reason.trim()) {
      setError("A reason is required for adjustments.");
      return;
    }

    setSubmitting(true);
    try {
      await axiosClient.post("/inventory/adjust", {
        productId: product.productId,
        newCount: count,
        reason: reason.trim(),
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Adjust Stock Count</h2>
        <p className="text-sm text-slate-500 mb-4">
          {product.name} ({product.sku}) · system stock: {product.currentStock}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Actual count (from physical stock take)
            </label>
            <input
              type="number"
              min="0"
              value={newCount}
              onChange={(e) => setNewCount(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              autoFocus
            />
            {!Number.isNaN(diff) && diff !== 0 && (
              <p className={`mt-1 text-xs ${diff > 0 ? "text-green-600" : "text-red-600"}`}>
                {diff > 0 ? `+${diff}` : diff} change from current system stock
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="e.g. Quarterly stock count"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}