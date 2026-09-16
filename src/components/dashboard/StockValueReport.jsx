import React from 'react';

const StockValueReport = ({ data, grandTotal, loading, onExport }) => {
  return (
    <div className="card w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h3 className="text-sm font-bold m-0 whitespace-nowrap">Inventory Valuation</h3>
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-md whitespace-nowrap">
            Grand Total: ${grandTotal ? grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
          </div>
          {onExport && (
            <button onClick={onExport} className="btn btn-outline h-7 text-[10px] px-2 shrink-0">
              <i className="bi bi-download"></i> CSV
            </button>
          )}
        </div>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Category</th>
            <th className="text-right">Unit Price</th>
            <th className="text-right">Current Stock</th>
            <th className="text-right">Total Value</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-slate-400">Loading...</td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map(item => (
              <tr key={item.productId}>
                <td className="font-medium">{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td className="text-right">${item.price.toFixed(2)}</td>
                <td className="text-right">{item.currentStock}</td>
                <td className="text-right font-semibold text-slate-700">
                  ${item.stockValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-slate-500">No data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockValueReport;
