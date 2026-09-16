import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StaffAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating Staff Account:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      {/* Modern Card Matching System Theme */}
      <div className="w-full max-w-md bg-white rounded-3xl p-7 border border-slate-200/90 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] text-slate-800 transition-all">
        
        {/* Top Header Navigation & Role Badge */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => navigate("/staff-login")}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition flex items-center gap-1"
          >
            ← Back to Login
          </button>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Staff Portal
          </span>
        </div>

        {/* Brand & Heading */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Electro<span className="text-blue-600">Store</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Inventory & Billing System
          </p>

          <h2 className="text-base font-bold text-slate-800 mt-3">Create Staff Account</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Register a new store operator terminal account
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="staff@electrostore.com"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.99] mt-3"
          >
            <span>Create Account</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="w-full border-t border-slate-100 mt-5 pt-3.5 text-center">
          <p className="text-xs text-slate-500">
            Already registered?{" "}
            <Link
              to="/staff-login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign In Instead
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default StaffAccount;