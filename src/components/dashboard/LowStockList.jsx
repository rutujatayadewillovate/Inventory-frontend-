import React from 'react';

const LowStockList = ({ data, loading }) => {
  return (
    <div className="card w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold m-0">Low Stock Alerts</h3>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Category</th>
            <th className="text-right">Current Stock</th>
            <th className="text-right">Reorder Level</th>
            <th>Status</th>
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
                <td className="text-right font-semibold text-red-600">{item.currentStock}</td>
                <td className="text-right">{item.reorderLevel}</td>
                <td>
                  <span className={item.currentStock === 0 ? "badge badge-danger" : "badge badge-warn"}>
                    {item.currentStock === 0 ? 'Out of Stock' : 'Low Stock'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-slate-500">No low stock items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockList;
