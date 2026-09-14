import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";  
import Index from "../components/auth/Index";
import AdminLogin from "../components/auth/admin/AdminLogin"
import AdminAccount from "../components/auth/admin/AdminAccount"
import AdminForgotPassword from "../components/auth/admin/AdminForgotPassword"
import StaffLogin from "../components/auth/staff/StaffLogin"
import StaffAccount from "../components/auth/staff/StaffAccount"
import StaffForgotPassword from "../components/auth/staff/StaffForgotPassword"
import DashboardPage from "../pages/DashboardPage"
import ReportsPage from "../pages/ReportsPage"
import MainLayout from "../components/common/MainLayout"

// Temporary mock admin guard (will be replaced by Person 1's AuthContext logic)
const AdminRoute = ({ children }) => {
  const userRole = 'admin'; // change to 'staff' to test redirect
  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        <Route path="/admin-login" element={<AdminLogin />} /> 
        <Route path="/admin-forgot-Password" element={<AdminForgotPassword />} /> 
        <Route path="/admin-register" element={<AdminAccount />} /> 

        <Route path="/staff-login" element={<StaffLogin />} /> 
        <Route path="/staff-forgot-Password" element={<StaffForgotPassword />} /> 
        <Route path="/staff-register" element={<StaffAccount />} />

        {/* Protected Application Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route 
            path="/reports" 
            element={
              <AdminRoute>
                <ReportsPage />
              </AdminRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
