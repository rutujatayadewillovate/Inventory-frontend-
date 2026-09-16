import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      {/* Matching Elevated Card with border shadow */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] text-slate-800 transition-all">
        
        {/* Top Back Button & Admin Badge */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition flex items-center gap-1"
          >
            ← Back
          </button>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Admin Console
          </span>
        </div>

        {/* Header Branding */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Electro<span className="text-blue-600">Store</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Inventory & Billing System
          </p>

          <h2 className="text-base font-bold text-slate-800 mt-4">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sign in to access administration dashboard
          </p>
        </div>

        {/* Login Form Fields */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-slate-700"
              >
                Password
              </label>
              <Link
                to="/admin-forgot-Password"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          {/* Solid Primary Button */}
          <button
            type="submit"
            className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.99] mt-2"
          >
            <span>Login As Admin</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </form>

        {/* Create Account Link (Exact path: /admin-register) */}
        <div className="w-full border-t border-slate-100 mt-6 pt-4 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/admin-register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create Admin Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;