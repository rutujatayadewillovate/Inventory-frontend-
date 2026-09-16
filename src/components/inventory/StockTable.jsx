export default function StockTable({ rows, loading, error, onIssue, onDamagedLost, onAdjust }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-200 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-center">Reorder Level</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-400">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-red-600">{error}</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-400">No products found.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.productId} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-700">{row.sku}</td>
                  <td className="px-4 py-3 text-slate-900">{row.name}</td>
                  <td className="px-4 py-3 text-center font-medium">{row.currentStock}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{row.reorderLevel}</td>
                  <td className="px-4 py-3">
                    {row.currentStock === 0 ? (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                        Out of Stock
                      </span>
                    ) : row.isLowStock ? (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        OK
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => onIssue(row)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Issue
                    </button>
                    <button
                      onClick={() => onDamagedLost(row)}
                      className="text-xs font-medium text-amber-600 hover:text-amber-800 mr-3"
                    >
                      Damaged/Lost
                    </button>
                    <button
                      onClick={() => onAdjust(row)}
                      className="text-xs font-medium text-slate-600 hover:text-slate-800"
                    >
                      Adjust
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}