import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, FileText, Info } from "lucide-react";
import { CartItem } from "../../types/cart.types";

interface CartSummaryProps {
  items: CartItem[];
  totalItems: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ totalItems }) => {
  const navigate = useNavigate();

  return (
    <aside className="cart-summary-card" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="summary-title">
        Procurement Summary
      </h2>

      <div className="summary-row">
        <span>Selected Line Items:</span>
        <strong>{totalItems} units</strong>
      </div>

      <div className="summary-row">
        <span>Estimated Delivery Mode:</span>
        <span>Institutional Freight</span>
      </div>

      <div className="summary-row">
        <span>Commercial Quotation:</span>
        <strong style={{ color: "var(--primary-700)" }}>Price on Request</strong>
      </div>

      <div className="summary-notice-box">
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <Info size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>
            B2B institutional pricing is calculated based on order quantity, facility tier, and delivery location. A quotation specialist will review your request.
          </span>
        </div>
      </div>

      <button
        className="btn btn-primary btn-block btn-lg"
        onClick={() => navigate("/checkout")}
        disabled={totalItems === 0}
      >
        <ShoppingBag size={18} />
        <span>Proceed to Checkout</span>
        <ArrowRight size={16} />
      </button>

      <button
        className="btn btn-outline btn-block"
        onClick={() => navigate("/request-quote")}
        disabled={totalItems === 0}
      >
        <FileText size={16} />
        <span>Convert Cart to Quotation (RFQ)</span>
      </button>

      <Link
        to="/products"
        style={{
          textAlign: "center",
          fontSize: "0.8125rem",
          color: "var(--navy-600)",
          textDecoration: "underline",
        }}
      >
        Continue Browsing Products
      </Link>
    </aside>
  );
};
