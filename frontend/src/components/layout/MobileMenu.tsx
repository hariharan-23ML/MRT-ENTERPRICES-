import React from "react";
import { NavLink } from "react-router-dom";
import { X, Shield } from "lucide-react";
import { CATEGORIES } from "../../data/catalogue/categories";
import { useAuth } from "../../hooks/useAuth";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "82%",
          maxWidth: "340px",
          height: "100%",
          backgroundColor: "var(--white)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--navy-900)" }}>MRT-ENTERPRISES</div>
            <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--primary-600)" }}>HEALTHCARE WHOLESALE</div>
          </div>
          <button onClick={onClose} style={{ padding: "6px", color: "var(--navy-600)" }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderBottom: "1px solid var(--navy-100)", paddingBottom: "16px" }}>
          <NavLink to="/" onClick={onClose} style={{ fontWeight: 600, padding: "8px 0" }}>Home</NavLink>
          <NavLink to="/products" onClick={onClose} style={{ fontWeight: 600, padding: "8px 0" }}>All Products</NavLink>
          <NavLink to="/orders" onClick={onClose} style={{ fontWeight: 600, padding: "8px 0" }}>Orders</NavLink>
          <NavLink to="/request-quote" onClick={onClose} style={{ fontWeight: 600, padding: "8px 0", color: "var(--primary-600)" }}>Request a Quote</NavLink>
          {isAdmin && (
            <NavLink to="/admin" onClick={onClose} style={{ fontWeight: 700, padding: "8px 0", color: "var(--primary-700)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Shield size={16} />
              <span>Admin Console</span>
            </NavLink>
          )}
        </div>

        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--navy-400)", marginBottom: "10px" }}>
            Medical Categories
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "240px", overflowY: "auto" }}>
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.id}`}
                onClick={onClose}
                style={{ fontSize: "0.8125rem", color: "var(--navy-700)", padding: "4px 0", display: "flex", justifyContent: "space-between" }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: "0.6875rem", background: "var(--navy-100)", padding: "1px 6px", borderRadius: "8px" }}>
                  {cat.productCount}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto", borderTop: "1px solid var(--navy-100)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {user ? (
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700 }}>Signed in as {user.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", marginBottom: "8px" }}>{user.email}</div>
              <button
                onClick={() => { logout(); onClose(); }}
                style={{ color: "var(--rose-600)", fontSize: "0.8125rem", fontWeight: 600 }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <NavLink to="/login" onClick={onClose} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                Sign In
              </NavLink>
              <NavLink to="/register" onClick={onClose} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
