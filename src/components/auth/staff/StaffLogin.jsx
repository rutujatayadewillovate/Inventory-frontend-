import React ,  { useState }from 'react'
import { Link   } from "react-router-dom";
import { handleLoginSubmit } from '../../../api/authApi';


function StaffLogin() {

    const [ staffLoginForm , setLoginForm ] = useState({   
            "designation" : "Staff" , 
            "email" : "" , 
            "password" : "" 
        } )
    
        const handlechange = ( e ) => { 
            setLoginForm({ 
                ...staffLoginForm , 
                [ e.target.id ] : e.target.value , 
            }) ; 
        } ; 

  return (
  
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 shadow-md flex flex-col items-center gap-4">
            <div className="w-full flex flex-col items-center justify-center mb-2">
                <h1 className="text-2xl font-bold text-blue-600">
                    ElectroStore
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                    Inventory & Billing System
                </p>
            </div>
            <div className="w-full">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={ staffLoginForm.email }
                    onChange={ handlechange }
                    placeholder="Enter your email"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
                />
            </div>

            <div className="w-full">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-2"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={ staffLoginForm.password }
                    onChange={ handlechange }
                    placeholder="Enter your password"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
                />
            </div>

            {/* Login Button */}
            <button
            type="submit"
            className="w-full border border-blue-600 rounded-xl px-4 py-2
                        text-blue-600 hover:bg-blue-600 hover:text-white transition"
            onClick={ ( e) => { handleLoginSubmit( e, staffLoginForm )}}
            >
            Login As Staff
            </button>

            {/* Forgot Password */}
            <div className="w-full text-center">
                <Link
                    to="/staff-forgot-Password"
                    className="text-sm text-blue-600 hover:underline"
                >
                    Forgot Password?
                </Link>
            </div>

            {/* temprory not creating staff from staff itself  */}
            
            {/* Create Account */}
            {/* <div className="w-full border-t border-slate-200 pt-4 text-center">
                <p className="text-sm text-slate-500">
                    Don't have an account?
                </p>

                <Link
                    to="/staff-register"
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    Create Account  
                </Link>
            </div> */}

        </div>
    </div>


  )
}

export default StaffLogin