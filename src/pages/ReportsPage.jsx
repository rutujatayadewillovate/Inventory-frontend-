import React, { useState, useEffect, useCallback } from 'react';
import MovementFilters from '../components/dashboard/MovementFilters';
import MovementHistoryReport from '../components/dashboard/MovementHistoryReport';
import { reportsApi } from '../api/reportsApi';
import { exportToCSV } from '../utils/csvExport';

const ReportsPage = () => {
  const [movementHistory, setMovementHistory] = useState([]);
  const [movementLoading, setMovementLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: '', type: 'All', startDate: '', endDate: ''
  });

  const loadMovementData = useCallback(async () => {
    setMovementLoading(true);
    try {
      const res = await reportsApi.getMovementHistory(filters);
      setMovementHistory(res.items);
    } catch (err) {
      console.error('Error loading movements', err);
    } finally {
      setMovementLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadMovementData();
  }, [loadMovementData]);

  const handleApplyFilters = () => loadMovementData();
  const handleExportCSV = () => exportToCSV(movementHistory, 'movement_report.csv');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="page-title">Inventory Reports</h1>
        <p className="page-sub">Analyze stock movements, transactions, and historical data.</p>
      </div>

      <div className="flex flex-col gap-4">
        <MovementFilters filters={filters} setFilters={setFilters} onApply={handleApplyFilters} onExport={handleExportCSV} />
        <MovementHistoryReport data={movementHistory} loading={movementLoading} />
      </div>
    </div>
  );
};

export default ReportsPage;
