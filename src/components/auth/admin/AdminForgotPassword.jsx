import React from 'react'
import { Link  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function AdminForgotPassword() {
  const navigate = useNavigate() ; 

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 shadow-md flex flex-col items-center gap-4">

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
            Forgot Password
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Enter your email to reset your password
          </p>
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

        {/* Reset Button */}
        <button
          type="button"
          className="w-full border border-blue-600 rounded-xl px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white transition"

        >
          Send Reset Link
        </button>

        {/* Back to Login - UI only for now */}
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={ () => navigate("/admin-login")}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default  AdminForgotPassword  