import React from 'react';

const MovementHistoryReport = ({ data, loading }) => {
  return (
    <div className="card w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold m-0">Movement History</h3>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Product Name</th>
            <th>Ref No</th>
            <th className="text-right">Qty Change</th>
            <th className="text-right">New Stock</th>
            <th>Reason</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-slate-400">Loading...</td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map(item => (
              <tr key={item.id}>
                <td className="whitespace-nowrap">{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <span className={`badge ${
                    item.type === 'Purchase' ? 'badge-ok' :
                    item.type === 'Issue' ? 'badge-info' :
                    item.type === 'Adjustment' ? 'badge-warn' : 'badge-neutral'
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="font-medium">{item.productName}</td>
                <td className="text-slate-500">{item.referenceNo || '-'}</td>
                <td className={`text-right font-bold ${item.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.quantityChange > 0 ? '+' : ''}{item.quantityChange}
                </td>
                <td className="text-right font-semibold">{item.newStock}</td>
                <td>{item.reason || '-'}</td>
                <td>{item.createdByUsername}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-slate-500">No matching transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovementHistoryReport;
