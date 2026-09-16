import React, { useState } from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';

const MainLayout = () => {
  // Temporary mock auth state - Person 1 will replace this with AuthContext
  const userRole = 'admin'; // change to 'staff' to test

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'bi-house', roles: ['admin', 'staff'] },
    { name: 'Products', path: '/products', icon: 'bi-box', roles: ['admin', 'staff'] },
    { name: 'Suppliers', path: '/suppliers', icon: 'bi-building', roles: ['admin'] },
    { name: 'Purchase Orders', path: '/purchase-orders', icon: 'bi-file-earmark-text', roles: ['admin'] },
    { name: 'Inventory & Stock', path: '/inventory', icon: 'bi-archive', roles: ['admin', 'staff'] },
    { name: 'Reports', path: '/reports', icon: 'bi-bar-chart-line', roles: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden text-[#0f172a]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] flex flex-col shrink-0">
        <div className="flex items-center gap-3 p-6 text-white border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-bold">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-wide">ElectroStore</span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">INVENTORY AND BILLING</span>
          </div>
        </div>

        <div className="mt-6 px-6 mb-2">
          <span className="text-[11px] font-bold text-slate-500 tracking-widest uppercase">MAIN MENU</span>
        </div>

        <nav className="flex-col flex gap-2 px-4 flex-1 mt-2">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <i className={`bi ${item.icon} text-lg`}></i>
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
