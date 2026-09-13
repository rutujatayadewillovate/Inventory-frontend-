import { BrowserRouter, Routes, Route } from "react-router-dom";  
import React from 'react';
import Index from "../components/auth/Index";
import AdminLogin from "../components/auth/admin/AdminLogin"
import AdminAccount from "../components/auth/admin/AdminAccount"
import AdminForgotPassword from "../components/auth/admin/AdminForgotPassword"
import StaffLogin from "../components/auth/staff/StaffLogin"
import StaffAccount from "../components/auth/staff/StaffAccount"
import StaffForgotPassword from "../components/auth/staff/StaffForgotPassword"

const AppRoutes = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element = { <Index/> } />
        
        
        <Route path="/admin-login" element={<AdminLogin />} /> 
        <Route path="/admin-forgot-Password" element={ <AdminForgotPassword/> }/> 
        <Route path="/admin-register" element={  <AdminAccount/> } /> 

        <Route path="/staff-login" element={<StaffLogin />} /> 
        <Route path="/staff-forgot-Password" element={ <StaffForgotPassword/> }/> 
        <Route path="/staff-register" element={  <StaffAccount/> } /> Staff

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
