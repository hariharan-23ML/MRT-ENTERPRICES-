import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "../../types/cart.types";
import { formatPriceDisplay } from "../../utils/formatters";

interface CartItemProps {
  item: CartItemType;
  onUpdateQty: (sku: string, qty: number) => void;
  onRemove: (sku: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQty, onRemove }) => {
  const { product, quantity } = item;
  const priceInfo = formatPriceDisplay(product.price, product.priceVerified);

  return (
    <div className="cart-item-row">
      {/* Thumbnail */}
      <div className="cart-item-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/placeholders/medical-device-placeholder.svg";
          }}
        />
      </div>

      {/* Info */}
      <div className="cart-item-info">
        <Link to={`/product/${product.sku}`} className="cart-item-name">
          {product.name}
        </Link>
        <span className="cart-item-sku">SKU: {product.sku}</span>
        <span className="cart-item-pricing">{priceInfo.text}</span>
      </div>

      {/* Qty Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          className="qty-btn"
          style={{ width: "28px", height: "28px", borderRadius: "4px" }}
          onClick={() => onUpdateQty(product.sku, Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span style={{ fontWeight: 700, width: "24px", textAlign: "center" }}>
          {quantity}
        </span>
        <button
          className="qty-btn"
          style={{ width: "28px", height: "28px", borderRadius: "4px" }}
          onClick={() => onUpdateQty(product.sku, quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <div className="cart-item-actions">
        <button
          className="cart-item-remove-btn"
          onClick={() => onRemove(product.sku)}
          title="Remove item"
          aria-label={`Remove ${product.name} from cart`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
