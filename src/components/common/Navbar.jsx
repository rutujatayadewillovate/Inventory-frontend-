import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/products": "Products Module",
  "/suppliers": "Suppliers Module",
  "/purchase-orders": "Purchase Orders",
  "/inventory": "Inventory & Stock",
  "/reports": "Reports",
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const currentTitle = PAGE_TITLES[location.pathname] || "Dashboard";
  const userRole = user?.role || "admin"; // default fallback
  const userName = user?.name || (userRole === "admin" ? "Admin User" : "Staff Member");
  const userEmail = user?.email || (userRole === "admin" ? "admin@electrostore.com" : "staff@electrostore.com");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left: Modern Pill Breadcrumb */}
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/70 text-xs text-slate-600 shadow-xs">
          {/* Store / Home Icon */}
          <span className="text-blue-600 flex items-center">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </span>

          <span className="font-medium text-slate-500 hover:text-slate-800 transition cursor-pointer">
            ElectroStore
          </span>

          {/* Subtle Chevron Divider */}
          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>

          {/* Active Page Pill with Status Dot */}
          <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200/80 shadow-xs text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Right Side: Alerts + Profile Card + Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Quick Low Stock Alert Bell */}
        <button
          type="button"
          onClick={() => navigate("/inventory")}
          title="2 Low Stock Warnings"
          className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* User Profile Card */}
        <div className="flex items-center gap-3">
          {/* Avatar Circle */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-xs ${
            userRole === "admin" ? "bg-blue-600 shadow-blue-500/20" : "bg-emerald-600 shadow-emerald-500/20"
          }`}>
            {userName.charAt(0).toUpperCase()}
          </div>

          {/* Name & Role Badge */}
          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {userName}
              </span>
              <span className={`text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded border ${
                userRole === "admin"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}>
                {userRole}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
              {userEmail}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out"
          className="p-2 ml-1 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition duration-150"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" />
          </svg>
        </button>

      </div>
    </header>
  );
}