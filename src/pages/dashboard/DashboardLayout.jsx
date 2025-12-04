import React from "react";
import { NavLink } from "react-router-dom";

const dashboardLinks = [
  { to: "/dashboard/sedi",       label: "SEDI Index" },
  { to: "/dashboard/gpi",        label: "GPI Governance" },
  { to: "/dashboard/iei",        label: "IEI Efficiency" },
  { to: "/dashboard/comparison", label: "State Comparison" },
  { to: "/dashboard/library",    label: "Data Library" },
];

const DashboardLayout = ({ title, subtitle, actions, children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-60 bg-slate-900 text-slate-100 border-r border-slate-800">
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-emerald-400 font-semibold">
            GDPAC
          </div>
          <div className="text-xs text-slate-300 mt-1">Analytics Console</div>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-1 text-sm">
          {dashboardLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                    : "text-slate-200 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 text-[0.65rem] text-slate-500 border-t border-slate-800">
          Signed in as <span className="font-semibold">Admin</span>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sticky top-0 z-20">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && (
              <p className="text-sm md:text-base text-slate-600 max-w-2xl mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">{actions}</div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-4 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
