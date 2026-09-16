import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function StaffLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set user as staff in AuthContext
    login({
      name: "Store Staff",
      email: email || "staff@electrostore.com",
      role: "staff",
    });

    // Navigate to Inventory page
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Staff Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] text-slate-800 transition-all">
        
        {/* Top Header Navigation & Role Badge */}
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
            Staff Terminal
          </span>
        </div>

        {/* Brand & Welcome Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Electro<span className="text-blue-600">Store</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Inventory & Billing System
          </p>

          <h2 className="text-base font-bold text-slate-800 mt-4">Staff Login</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sign in to access counter POS and store billing
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-slate-700"
              >
                Password
              </label>
              <Link
                to="/staff-forgot-Password"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.99] mt-2"
          >
            <span>Login As Staff</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </form>

        {/* Create Account Link */}
        <div className="w-full border-t border-slate-100 mt-6 pt-4 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/staff-register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}