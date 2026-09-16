import React from 'react';

const SummaryCards = ({ metrics, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="card h-24 animate-pulse bg-slate-100"></div>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="card flex flex-col justify-center">
        <span className="text-[10.5px] text-[#64748b] font-semibold uppercase tracking-wider">Total Products</span>
        <span className="text-2xl font-bold mt-1 text-[#0f172a]">{metrics.totalProducts}</span>
      </div>
      
      <div className="card flex flex-col justify-center border-l-4 border-l-red-500">
        <span className="text-[10.5px] text-[#64748b] font-semibold uppercase tracking-wider">Low Stock Items</span>
        <span className="text-2xl font-bold mt-1 text-red-600">{metrics.lowStockCount}</span>
      </div>
      
      <div className="card flex flex-col justify-center border-l-4 border-l-blue-500">
        <span className="text-[10.5px] text-[#64748b] font-semibold uppercase tracking-wider">Total Stock Value</span>
        <span className="text-2xl font-bold mt-1 text-blue-700">
          ${metrics.totalStockValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      
      <div className="card flex flex-col justify-center border-l-4 border-l-emerald-500">
        <span className="text-[10.5px] text-[#64748b] font-semibold uppercase tracking-wider">Total Sales</span>
        <span className="text-2xl font-bold mt-1 text-emerald-700">
          ${metrics.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default SummaryCards;
