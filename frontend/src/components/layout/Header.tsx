import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User as UserIcon, Menu, Shield } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="header-brand" aria-label="MRT Enterprises MediSource Homepage">
          <img
            src="/logo/medisource-logo.svg"
            alt="MRT Enterprises MediSource"
            className="brand-logo-img"
          />
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Navigation Links */}
        <Navigation />

        {/* Right Actions */}
        <div className="header-actions">
          {isAdmin && (
            <Link
              to="/admin"
              className="btn btn-sm btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              title="Admin Dashboard"
            >
              <Shield size={15} color="var(--primary-600)" />
              <span>Admin</span>
            </Link>
          )}

          {user ? (
            <button
              onClick={() => navigate("/orders")}
              className="account-button"
              aria-label="Account details"
            >
              <UserIcon size={16} />
              <span>{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <Link to="/login" className="account-button" aria-label="Sign in">
              <UserIcon size={16} />
              <span>Sign In</span>
            </Link>
          )}

          {/* Cart Icon with badge */}
          <Link
            to="/cart"
            className="cart-button"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
