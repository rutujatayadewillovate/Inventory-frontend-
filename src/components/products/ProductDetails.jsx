import React, { useEffect, useState } from "react";
import { productsApi } from "../../api/productsApi";

export default function ProductDetailsModal({ productId, isOpen, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId && isOpen) {
      setLoading(true);
      productsApi
        .getProductById(productId)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [productId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-lg text-slate-800">
            Product Specification
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              Loading details...
            </div>
          ) : product ? (
            <div className="space-y-4 text-sm">
              <div className="border-b pb-3">
                <div className="text-xl font-bold text-slate-900">
                  {product.name}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  SKU: {product.sku} | Barcode: {product.barcode || "N/A"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    Brand & Model
                  </span>
                  <p className="font-medium text-slate-800">
                    {product.brand || "Generic"} ({product.modelNumber || "N/A"}
                    )
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    Warranty
                  </span>
                  <p className="font-medium text-slate-800">
                    {product.warrantyPeriod || "Standard"}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    Purchase Price
                  </span>
                  <p className="font-medium text-slate-800">
                    ₹{product.purchasePrice.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    Retail Price
                  </span>
                  <p className="font-semibold text-blue-600">
                    ₹{product.sellingPrice.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    Available Stock
                  </span>
                  <p
                    className={`font-bold ${product.isLowStock ? "text-amber-600" : "text-emerald-600"}`}
                  >
                    {product.currentStock} units
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    Status
                  </span>
                  <p className="font-medium text-slate-800">{product.status}</p>
                </div>
              </div>

              {product.description && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Description:
                  </span>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-rose-500 text-sm">
              Product details unavailable.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
