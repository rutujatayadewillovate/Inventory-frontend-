import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../components/auth/Index";
import AdminAccount from "../components/auth/admin/AdminAccount";
import AdminForgotPassword from "../components/auth/admin/AdminForgotPassword";
import AdminLogin from "../components/auth/admin/AdminLogin";
import StaffAccount from "../components/auth/staff/StaffAccount";
import StaffForgotPassword from "../components/auth/staff/StaffForgotPassword";
import StaffLogin from "../components/auth/staff/StaffLogin";
import ProductsPage from "../pages/ProductsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-forgot-Password"
          element={<AdminForgotPassword />}
        />
        <Route path="/admin-register" element={<AdminAccount />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route
          path="/staff-forgot-Password"
          element={<StaffForgotPassword />}
        />
        <Route path="/staff-register" element={<StaffAccount />} /> Staff
        <Route path="/ProductsPage" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
