import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("admin"); // 'admin' | 'staff'

  const handleContinue = () => {
    if (selectedRole === "admin") {
      navigate("/admin-login");
    } else {
      navigate("/staff-login");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
      
      {/* Card with subtle edge glow & soft border shadow */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] text-slate-800 transition-all">
        
        {/* Top Shield Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>

        {/* Headings */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Electro<span className="text-blue-600">Store</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Inventory & Billing System
          </p>

          <h3 className="text-base font-bold text-slate-800 mt-4">Access Portal</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose your authorization role to enter console
          </p>
        </div>

        {/* Role Selector Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          
          {/* Administrator Tile */}
          <button
            type="button"
            onClick={() => setSelectedRole("admin")}
            className={`relative p-3.5 rounded-2xl text-left border transition-all duration-200 ${
              selectedRole === "admin"
                ? "bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-500/20"
                : "bg-slate-50/60 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {selectedRole === "admin" && (
              <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
            )}
            <div className={`${selectedRole === "admin" ? "text-blue-600" : "text-slate-400"} mb-2`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className={`font-bold text-sm leading-tight ${selectedRole === "admin" ? "text-slate-900" : "text-slate-700"}`}>
              Administrator
            </div>
            <p className="text-[10px] text-slate-500 mt-1 leading-snug">
              Full stock, billing, pricing & audit logs
            </p>
          </button>

          {/* Store Staff Tile */}
          <button
            type="button"
            onClick={() => setSelectedRole("staff")}
            className={`relative p-3.5 rounded-2xl text-left border transition-all duration-200 ${
              selectedRole === "staff"
                ? "bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-500/20"
                : "bg-slate-50/60 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {selectedRole === "staff" && (
              <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
            )}
            <div className={`${selectedRole === "staff" ? "text-blue-600" : "text-slate-400"} mb-2`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className={`font-bold text-sm leading-tight ${selectedRole === "staff" ? "text-slate-900" : "text-slate-700"}`}>
              Store Staff
            </div>
            <p className="text-[10px] text-slate-500 mt-1 leading-snug">
              Counter POS, inventory check, rapid bills
            </p>
          </button>
        </div>

        {/* Dynamic Action Button */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
        >
          <span>
            Continue as {selectedRole === "admin" ? "Administrator" : "Store Staff"}
          </span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>

        <p className="text-center text-[11px] text-slate-400 mt-3">
          Protected access • Click continue to authenticate
        </p>
      </div>

    </div>
  );
}