import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, FileText, Check } from "lucide-react";
import { Product } from "../../types/product.types";
import { Badge } from "../common/Badge";
import { formatStockDisplay, formatPriceDisplay } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [qty, setQty] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const stockInfo = formatStockDisplay(product.stockStatus, product.stockVerified);
  const priceInfo = formatPriceDisplay(product.price, product.priceVerified);

  const handleAction = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/request-quote?sku=${encodeURIComponent(product.sku)}`);
  };

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Product Image Area */}
      <div className="card-image-box">
        <Link to={`/product/${product.sku}`} style={{ width: "100%", height: "100%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/images/placeholders/medical-device-placeholder.svg";
            }}
          />
        </Link>

        {/* Availability Badge */}
        <div className="card-badge-top-left">
          <Badge variant={stockInfo.badgeType}>
            {stockInfo.text}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-meta-row">
          <span className="card-sku">{product.sku}</span>
          <span className="card-cat-name" title={product.categoryName}>
            {product.categoryName}
          </span>
        </div>

        <h3 className="card-title">
          <Link to={`/product/${product.sku}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        <p className="card-desc" title={product.shortDescription}>
          {product.shortDescription}
        </p>

        <div className="card-brand-status">
          <span>Brand:</span>
          <strong style={{ color: "var(--navy-800)" }}>
            {product.brand ? product.brand : "Brand info to be confirmed"}
          </strong>
        </div>

        {/* Pricing & Order Actions */}
        <div className="card-price-row">
          <div>
            <div className="card-price-label">Commercial Pricing</div>
            <div className="card-price-value">{priceInfo.text}</div>
          </div>

          <div className="card-action-bar">
            <input
              type="number"
              min={1}
              max={999}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="card-qty-input"
              aria-label="Quantity"
            />

            <button
              className="card-action-btn"
              onClick={handleAction}
              title="Add product to procurement cart"
            >
              {added ? (
                <>
                  <Check size={14} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleQuoteClick}
              style={{
                height: "34px",
                padding: "0 8px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--primary-50)",
                border: "1px solid var(--primary-200)",
                color: "var(--primary-700)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Request a Quote for this product"
            >
              <FileText size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
