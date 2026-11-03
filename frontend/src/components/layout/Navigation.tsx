import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "../../data/catalogue/categories";

export const Navigation: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="header-nav" aria-label="Main Navigation">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Home
      </NavLink>

      <div className="nav-dropdown-wrapper" ref={dropdownRef} style={{ position: "relative" }}>
        <button
          className="nav-dropdown-trigger"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <span>Categories</span>
          <ChevronDown size={15} style={{ transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.id}`}
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                <span>{cat.name}</span>
                <span className="dropdown-badge">{cat.productCount}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <NavLink
        to="/products"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Products
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Orders
      </NavLink>
    </nav>
  );
};
