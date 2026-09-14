import React from 'react';

const MovementFilters = ({ filters, setFilters, onApply, onExport }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card w-full mb-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        
        <div className="flex-1">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Search Products</label>
          <input 
            type="text" 
            name="search" 
            value={filters.search} 
            onChange={handleChange} 
            placeholder="Search by name or Ref No..." 
            className="field-sm w-full"
          />
        </div>

        <div className="w-full md:w-48">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Movement Type</label>
          <select 
            name="type" 
            value={filters.type} 
            onChange={handleChange} 
            className="field-sm w-full"
          >
            <option value="All">All Types</option>
            <option value="Purchase">Purchase</option>
            <option value="Issue">Issue</option>
            <option value="Adjustment">Adjustment</option>
          </select>
        </div>

        <div className="w-full md:w-36">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Start Date</label>
          <input 
            type="date" 
            name="startDate" 
            value={filters.startDate} 
            onChange={handleChange} 
            className="field-sm w-full"
          />
        </div>

        <div className="w-full md:w-36">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">End Date</label>
          <input 
            type="date" 
            name="endDate" 
            value={filters.endDate} 
            onChange={handleChange} 
            className="field-sm w-full"
          />
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <button onClick={onApply} className="btn btn-primary h-[31px]">
            <i className="bi bi-funnel"></i> Apply
          </button>
          <button onClick={onExport} className="btn btn-outline h-[31px]">
            <i className="bi bi-download"></i> Export CSV
          </button>
        </div>

      </div>
    </div>
  );
};

export default MovementFilters;
