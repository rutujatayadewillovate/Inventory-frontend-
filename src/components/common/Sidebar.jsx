import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Suppliers", path: "/suppliers" },
  { label: "Purchase Orders", path: "/purchase-orders" },
  { label: "Inventory & Stock", path: "/inventory" },
  { label: "Reports", path: "/reports" },
];

const ICONS = {
  "/dashboard": "M3.75 12l8.25-8.25L20.25 12M5.25 10.5V19.5a1.5 1.5 0 001.5 1.5h3v-6h4.5v6h3a1.5 1.5 0 001.5-1.5V10.5",
  "/products": "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  "/suppliers": "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  "/purchase-orders": "M9 12h3.75M9 15h3.75M9 18h3.75M3.75 21h16.5c.621 0 1.125-.504 1.125-1.125V9.75c0-.621-.504-1.125-1.125-1.125H16.5V4.875c0-.621-.504-1.125-1.125-1.125H4.875C4.254 3.75 3.75 4.254 3.75 4.875v15c0 .621.504 1.125 1.125 1.125z",
  "/inventory": "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6.75 3.75h1.5m-1.5 3h1.5m-8.25-8.25h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  "/reports": "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
};

export default function Sidebar() {
  return (
    <aside className="w-56 bg-slate-900 flex-shrink-0 flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
          E
        </div>
        <div>
          <div className="text-white font-bold text-sm leading-tight">ElectroStore</div>
          <div className="text-slate-400 text-[10px] uppercase tracking-wide">Inventory and Billing</div>
        </div>
      </div>

      <div className="px-5 mt-4 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Main Menu
      </div>

      <nav className="px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`
            }
          >
            <svg
              className="w-[18px] h-[18px] flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[item.path]} />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}