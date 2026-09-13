import React from 'react'
import { Link , useNavigate } from "react-router-dom";

function StaffAccount() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-4 shadow-md flex flex-col items-center gap-2">
        {/* Header */}
        <div className="w-full flex flex-col items-center justify-center mb-2">
          <h1 className="text-2xl font-bold text-blue-600">
            ElectroStore
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Inventory & Billing System
          </p>
        </div>

        {/* Title */}
        <div className="w-full text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Create Account
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Create a new user account
          </p>
        </div>

        {/* Name */}
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-left text-sm font-medium text-slate-700 mb-2"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
           className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-left text-sm font-medium text-slate-700 mb-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
           className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-left text-sm font-medium text-slate-700 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-left text-sm font-medium text-slate-700 mb-2"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Create Account Button */}
        <button
          type="button"
          className="w-full border border-blue-600 rounded-xl px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          Create Account
        </button>

        {/* Back to Login */}
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={ () => navigate("/staff-login")}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default StaffAccount;

