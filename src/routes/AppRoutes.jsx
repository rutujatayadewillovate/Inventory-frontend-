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
import ProductsPage from "../pages/ProductsPage"
import AddEditProductPage from "../pages/AddEditProductPage"
import ProductDetailsPage from "../pages/ProductDetailsPage"
import InventoryPage from "../pages/InventoryPage"
import SuppliersPage from "../pages/SuppliersPage"
import PurchaseOrdersPage from "../pages/PurchaseOrdersPage"
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
          
          {/* Product Routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/add" element={<AddEditProductPage />} />
          <Route path="/products/edit/:id" element={<AddEditProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          
          {/* Inventory Route */}
          <Route path="/inventory" element={<InventoryPage />} />
          
          {/* Admin Routes */}
          <Route 
            path="/suppliers" 
            element={
              <AdminRoute>
                <SuppliersPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="/purchase-orders" 
            element={
              <AdminRoute>
                <PurchaseOrdersPage />
              </AdminRoute>
            } 
          />
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
