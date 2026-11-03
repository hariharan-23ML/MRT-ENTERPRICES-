import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types/product.types";
import { Badge } from "../common/Badge";
import { formatStockDisplay, formatPriceDisplay } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import { FileText, ShoppingCart } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-list" role="region" aria-label="Medical products list">
      {products.map((product) => {
        const stockInfo = formatStockDisplay(product.stockStatus, product.stockVerified);
        const priceInfo = formatPriceDisplay(product.price, product.priceVerified);

        return (
          <div key={product.sku} className="product-list-card">
            {/* Image */}
            <div
              style={{
                width: "100%",
                height: "140px",
                backgroundColor: "#f8fafc",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--navy-200)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/placeholders/medical-device-placeholder.svg";
                }}
              />
            </div>

            {/* Information */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span className="card-sku">{product.sku}</span>
                <Badge variant={stockInfo.badgeType}>{stockInfo.text}</Badge>
                <span style={{ fontSize: "0.75rem", color: "var(--navy-500)", fontWeight: 600 }}>
                  {product.categoryName}
                </span>
              </div>

              <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "8px" }}>
                <Link to={`/product/${product.sku}`} style={{ color: "var(--navy-900)" }}>
                  {product.name}
                </Link>
              </h3>

              <p style={{ fontSize: "0.8125rem", color: "var(--navy-600)", marginBottom: "8px", lineHeight: "1.5" }}>
                {product.shortDescription}
              </p>

              <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
                <span>Brand: </span>
                <strong style={{ color: "var(--navy-800)" }}>
                  {product.brand || "Brand info to be confirmed"}
                </strong>
                <span style={{ margin: "0 8px" }}>•</span>
                <span>MOQ: </span>
                <strong style={{ color: "var(--navy-800)" }}>{product.minimumOrderQuantity}</strong>
              </div>
            </div>

            {/* Price & Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderLeft: "1px solid var(--navy-100)", paddingLeft: "20px" }}>
              <div>
                <div style={{ fontSize: "0.6875rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                  Pricing
                </div>
                <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--primary-700)" }}>
                  {priceInfo.text}
                </div>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => addToCart(product, 1)}
              >
                <ShoppingCart size={14} />
                <span>Add to Cart</span>
              </button>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigate(`/request-quote?sku=${encodeURIComponent(product.sku)}`)}
              >
                <FileText size={14} />
                <span>Request Quote</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
