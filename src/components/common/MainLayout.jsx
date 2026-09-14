import React, { useState } from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';

const MainLayout = () => {
  // Temporary mock auth state - Person 1 will replace this with AuthContext
  const userRole = 'admin'; // change to 'staff' to test

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'bi-grid-1x2', roles: ['admin', 'staff'] },
    { name: 'Products', path: '/products', icon: 'bi-box-seam', roles: ['admin', 'staff'] },
    { name: 'Inventory', path: '/inventory', icon: 'bi-stack', roles: ['admin', 'staff'] },
    { name: 'Suppliers', path: '/suppliers', icon: 'bi-truck', roles: ['admin'] },
    { name: 'Purchase Orders', path: '/purchase-orders', icon: 'bi-receipt', roles: ['admin'] },
    { name: 'Reports', path: '/reports', icon: 'bi-bar-chart-line', roles: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(userRole));
  
  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden text-[#0f172a]">
      {/* Sidebar */}
      <aside className="w-48 bg-[#1e293b] flex flex-col shrink-0">
        <div className="flex items-center gap-2 p-4 text-white font-bold text-lg border-b border-slate-700">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          ElectroStore
        </div>
        
        <nav className="flex-col flex gap-1 mt-4 px-2 flex-1">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <i className={`bi ${item.icon}`}></i>
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm w-full">
            <i className="bi bi-box-arrow-left"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="text-sm font-medium text-slate-600">
            System Dashboard
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-1">
              <span className="text-xs font-bold text-slate-700 capitalize">{userRole} User</span>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${userRole === 'admin' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
              {userRole === 'admin' ? 'AD' : 'ST'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-[#f1f5f9]">
          <Outlet context={{ userRole }} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
