import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  // State to track selected role ("admin" or "staff")
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleContinue = () => {
    if (selectedRole === "admin") {
      navigate("/admin-login");
    } else {
      navigate("/staff-login");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-x-hidden font-sans">
      
      {/* LEFT 40%: Edge-to-Edge Warehouse Inventory Image */}
      <div className="relative w-full md:w-[40%] min-h-[380px] md:min-h-screen bg-slate-950 overflow-hidden flex flex-col justify-between p-8 sm:p-10 lg:p-12">
        
        {/* High-Resolution Stock Image */}
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85"
          alt="Modern Warehouse Inventory & Pallet Racks"
          className="absolute inset-0 w-full h-full object-cover object-center contrast-105 saturate-105"
        />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/25 pointer-events-none"></div>

        {/* Top Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/30 border border-white/15">
            ⚡
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
              Electro<span className="text-blue-400">Store</span>
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-300 font-semibold tracking-wider uppercase mt-0.5">
              Inventory &amp; Billing System
            </p>
          </div>
        </div>

        {/* Bottom Highlights & Caption */}
        <div className="relative z-10 max-w-md mt-auto pt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-3 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Real-time Warehouse Operations
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
            Smart Stock Tracking &amp; Counter Billing
          </h3>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">
            Centralized inventory management, instant SKU lookup, multi-tier procurement, and seamless retail invoicing.
          </p>
        </div>

      </div>

      {/* RIGHT 60%: Background Dull View */}
      <div className="w-full md:w-[60%] min-h-[500px] md:min-h-screen flex items-center justify-center bg-[#f1f5f9] px-6 sm:px-10 lg:px-12 py-12">
        
        {/* Main Form Box */}
        <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-200/80 text-center">
          
          {/* Top Shield Icon Badge */}
          <div className="mx-auto w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-lg mb-4 shadow-xs">
            🛡️
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Electro<span className="text-blue-600">Store</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Inventory &amp; Billing System
            </p>

            <div className="mt-5">
              <h2 className="text-base font-bold text-slate-900">Access Portal</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Choose your authorization role to enter console
              </p>
            </div>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5 text-left">
            
            {/* Administrator Card */}
            <div
              onClick={() => setSelectedRole("admin")}
              className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedRole === "admin"
                  ? "border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-600/10"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <svg className={`w-5 h-5 transition-colors ${selectedRole === "admin" ? "text-blue-600" : "text-slate-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedRole === "admin" ? "border-blue-600 bg-blue-600" : "border-slate-200 bg-white"
                }`}>
                  {selectedRole === "admin" && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Administrator</h3>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-medium">
                Full stock, billing, pricing &amp; audit logs
              </p>
            </div>

            {/* Store Staff Card */}
            <div
              onClick={() => setSelectedRole("staff")}
              className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedRole === "staff"
                  ? "border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-600/10"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <svg className={`w-5 h-5 transition-colors ${selectedRole === "staff" ? "text-blue-600" : "text-slate-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedRole === "staff" ? "border-blue-600 bg-blue-600" : "border-slate-200 bg-white"
                }`}>
                  {selectedRole === "staff" && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Store Staff</h3>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-medium">
                Counter POS, inventory check, rapid bills
              </p>
            </div>

          </div>

          {/* Continue Action Button */}
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue as {selectedRole === "admin" ? "Administrator" : "Store Staff"}</span>
            <span className="font-bold text-sm">→</span>
          </button>

          {/* Footer Note */}
          <div className="mt-4 text-center text-[11px] text-slate-400 font-medium">
            Protected access • Click continue to authenticate
          </div>

        </div>

      </div>

    </div>
  );
}