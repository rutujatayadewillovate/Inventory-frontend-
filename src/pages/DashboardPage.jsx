import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import SummaryCards from '../components/dashboard/SummaryCards';
import LowStockList from '../components/dashboard/LowStockList';
import StockValueReport from '../components/dashboard/StockValueReport';
import { reportsApi } from '../api/reportsApi';
import { exportToCSV } from '../utils/csvExport';

const DashboardPage = () => {
  const { userRole } = useOutletContext(); 
  
  const [metrics, setMetrics] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [lowStock, setLowStock] = useState([]);
  const [lowStockLoading, setLowStockLoading] = useState(true);
  const [stockValuation, setStockValuation] = useState({ items: [], grandTotal: 0 });
  const [stockValLoading, setStockValLoading] = useState(true);

  const loadOverviewData = useCallback(async () => {
    setMetricsLoading(true);
    setLowStockLoading(true);
    if (userRole === 'admin') setStockValLoading(true);
    
    try {
      const promises = [reportsApi.getSummaryMetrics(), reportsApi.getLowStockItems(1, 10)];
      if (userRole === 'admin') promises.push(reportsApi.getStockValuation(1, 100));
      
      const results = await Promise.all(promises);
      setMetrics(results[0]);
      setLowStock(results[1].items);
      
      if (userRole === 'admin') {
        setStockValuation({ items: results[2].items, grandTotal: results[2].grandTotal });
      }
    } catch (err) {
      console.error('Error loading overview', err);
    } finally {
      setMetricsLoading(false);
      setLowStockLoading(false);
      setStockValLoading(false);
    }
  }, [userRole]);

  useEffect(() => {
    loadOverviewData();
  }, [loadOverviewData]);

  const handleExportValuation = () => exportToCSV(stockValuation.items, 'stock_valuation.csv');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-sub">Monitor key metrics and inventory health.</p>
      </div>

      {userRole === 'admin' ? (
        <SummaryCards metrics={metrics} loading={metricsLoading} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card flex flex-col justify-center">
             <span className="text-[10.5px] text-[#64748b] font-semibold uppercase tracking-wider">Today's Sales</span>
             <span className="text-2xl font-bold mt-1 text-[#0f172a]">{metricsLoading ? '...' : '12'}</span>
          </div>
          <div className="card flex flex-col justify-center">
             <span className="text-[10.5px] text-[#64748b] font-semibold uppercase tracking-wider">Items Sold (Shift)</span>
             <span className="text-2xl font-bold mt-1 text-[#0f172a]">{metricsLoading ? '...' : '45'}</span>
          </div>
          <div className="card flex flex-col justify-center border-l-4 border-l-warn">
             <span className="text-[10.5px] text-[#64748b] font-semibold uppercase tracking-wider">Pending Alerts</span>
             <span className="text-2xl font-bold mt-1 text-warn">{metricsLoading ? '...' : (metrics?.lowStockCount || 0)}</span>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${userRole === 'admin' ? 'lg:grid-cols-2' : ''} gap-6`}>
        <LowStockList data={lowStock} loading={lowStockLoading} />
        
        {userRole === 'admin' && (
          <StockValueReport 
            data={stockValuation.items} 
            grandTotal={stockValuation.grandTotal} 
            loading={stockValLoading}
            onExport={handleExportValuation}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
