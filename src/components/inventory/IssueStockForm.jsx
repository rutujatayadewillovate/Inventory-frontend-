import { useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function IssueStockForm({ product, mode, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [lossType, setLossType] = useState("DAMAGED");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isDamagedMode = mode === "damaged";
  const title = isDamagedMode ? "Record Damaged / Lost Stock" : "Issue Stock";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const qty = Number(quantity);
    if (!qty || qty <= 0) {
      setError("Enter a quantity greater than zero.");
      return;
    }
    if (!reason.trim()) {
      setError("A reason is required.");
      return;
    }
    if (qty > product.currentStock) {
      setError(`Only ${product.currentStock} units in stock.`);
      return;
    }

    setSubmitting(true);
    try {
      if (isDamagedMode) {
        await axiosClient.post("/inventory/damaged-lost", {
          productId: product.productId,
          quantity: qty,
          type: lossType,
          reason: reason.trim(),
        });
      } else {
        await axiosClient.post("/inventory/issue", {
          productId: product.productId,
          quantity: qty,
          reason: reason.trim(),
          referenceNo: referenceNo.trim() || null,
        });
      }
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
        <h2 className="text-lg font-semibold text-slate-900 mb-1">{title}</h2>
        <p className="text-sm text-slate-500 mb-4">
          {product.name} ({product.sku}) · in stock: {product.currentStock}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isDamagedMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                value={lossType}
                onChange={(e) => setLossType(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="DAMAGED">Damaged</option>
                <option value="LOST">Lost</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              autoFocus
            />
          </div>

          {!isDamagedMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Reference No. (optional)
              </label>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="e.g. Dispatch #22"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder={isDamagedMode ? "e.g. Water damage in storage" : "e.g. Site dispatch"}
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