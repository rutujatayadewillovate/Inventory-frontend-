import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/products": "Products Module",
  "/suppliers": "Suppliers Module",
  "/purchase-orders": "Purchase Orders",
  "/inventory": "Inventory & Stock",
  "/reports": "Reports",
};

export default function Layout() {
  const location = useLocation();
  const currentTitle = PAGE_TITLES[location.pathname] || "Dashboard";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="text-sm text-slate-500">
            <span>ElectroStore</span>
            <span className="mx-1">/</span>
            <span className="font-semibold text-slate-800">{currentTitle}</span>
          </div>
        </div>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}