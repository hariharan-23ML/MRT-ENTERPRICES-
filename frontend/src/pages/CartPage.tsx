import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { EmptyState } from "../components/common/EmptyState";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";

export const CartPage: React.FC = () => {
  const { items, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="container cart-page-container">
      <div className="cart-title-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <h1>Procurement Cart</h1>
            <p style={{ color: "var(--navy-500)", fontSize: "0.875rem" }}>
              Review your institutional equipment requirements prior to order submission or quotation generation.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--navy-500)",
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              <Trash2 size={14} />
              <span>Clear Cart</span>
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart size={36} />}
          title="Your Procurement Cart is Empty"
          description="Browse our 12 medical equipment categories and add items to request official institutional pricing."
          action={
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Explore Product Catalogue</span>
            </Link>
          }
        />
      ) : (
        <div className="cart-grid-layout">
          <div className="cart-items-card">
            {items.map((item) => (
              <CartItem
                key={item.product.sku}
                item={item}
                onUpdateQty={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <CartSummary items={items} totalItems={totalItems} />
        </div>
      )}
    </div>
  );
};
