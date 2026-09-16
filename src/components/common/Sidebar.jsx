import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ALL_NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", roles: ["admin", "staff"] },
  { label: "Products", path: "/products", roles: ["admin", "staff"] },
  { label: "Suppliers", path: "/suppliers", roles: ["admin"] },
  { label: "Purchase Orders", path: "/purchase-orders", roles: ["admin"] },
  { label: "Inventory & Stock", path: "/inventory", roles: ["admin", "staff"] },
  { label: "Reports", path: "/reports", roles: ["admin"] },
];

const ICONS = {
  "/dashboard": "M3.75 12l8.25-8.25L20.25 12M5.25 10.5V19.5a1.5 1.5 0 001.5 1.5h3v-6h4.5v6h3a1.5 1.5 0 001.5-1.5V10.5",
  "/products": "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  "/suppliers": "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  "/purchase-orders": "M9 12h3.75M9 15h3.75M9 18h3.75M3.75 21h16.5c.621 0 1.125-.504 1.125-1.125V9.75c0-.621-.504-1.125-1.125-1.125H16.5V4.875c0-.621-.504-1.125-1.125-1.125H4.875C4.254 3.75 3.75 4.254 3.75 4.875v15c0 .621.504 1.125 1.125 1.125z",
  "/inventory": "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6.75 3.75h1.5m-1.5 3h1.5m-8.25-8.25h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  "/reports": "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
};

export default function Sidebar() {
  const { user } = useAuth();
  const currentRole = user?.role || "admin";

  // Filter items based on active role
  const visibleNavItems = ALL_NAV_ITEMS.filter((item) =>
    item.roles.includes(currentRole)
  );

  return (
    <aside className="w-60 bg-slate-900 flex-shrink-0 flex flex-col min-h-screen border-r border-slate-800">
      
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-500/20">
          ⚡
        </div>
        <div>
          <div className="text-white font-extrabold text-sm tracking-tight">ElectroStore</div>
          <div className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider">
            Inventory & Billing
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {currentRole === "admin" ? "Management Console" : "Terminal Menu"}
      </div>

      {/* Filtered Nav Links */}
      <nav className="px-3 space-y-1 flex-1">
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
              }`
            }
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[item.path]} />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Role Pill Indicator at Sidebar Bottom */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="bg-slate-800/60 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${currentRole === "admin" ? "bg-blue-400" : "bg-emerald-400"} animate-pulse`}></span>
            <span className="text-xs font-semibold text-slate-300 capitalize">{currentRole} Active</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">v1.2</span>
        </div>
      </div>
    </aside>
  );
}