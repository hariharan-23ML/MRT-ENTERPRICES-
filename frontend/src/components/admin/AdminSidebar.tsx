import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  FileSpreadsheet,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <aside className="admin-sidebar" aria-label="Admin Navigation Sidebar">
      <div className="admin-sidebar-header">
        <Shield size={24} color="var(--primary-400)" />
        <div>
          <div style={{ fontWeight: 800, color: "var(--white)", fontSize: "0.9375rem" }}>
            MRT Console
          </div>
          <div style={{ fontSize: "0.6875rem", color: "var(--primary-300)", fontWeight: 700 }}>
            ENTERPRISE ADMIN
          </div>
        </div>
      </div>

      <nav className="admin-nav-group">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
        >
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
        >
          <Package size={18} />
          <span>Products (60)</span>
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
        >
          <Layers size={18} />
          <span>Categories (12)</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
        >
          <ShoppingBag size={18} />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
        >
          <Users size={18} />
          <span>Customers</span>
        </NavLink>

        <NavLink
          to="/admin/quotations"
          className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
        >
          <FileSpreadsheet size={18} />
          <span>Quotations (RFQ)</span>
        </NavLink>
      </nav>

      <div className="admin-sidebar-footer">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.75rem",
            color: "var(--navy-400)",
          }}
        >
          <ArrowLeft size={14} />
          <span>Customer View</span>
        </Link>
        <button
          onClick={logout}
          style={{ fontSize: "0.75rem", color: "var(--rose-600)", fontWeight: 600 }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};
