import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductBySku } from "../data/catalogue/products";
import { ProductGallery } from "../components/products/ProductGallery";
import { ProductTabs } from "../components/products/ProductTabs";
import { Badge } from "../components/common/Badge";
import { formatStockDisplay, formatPriceDisplay } from "../utils/formatters";
import { useCart } from "../hooks/useCart";
import {
  ShoppingCart,
  FileSpreadsheet,
  PhoneCall,
  Check,
  Shield,
  ArrowLeft,
} from "lucide-react";

export const ProductDetailsPage: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const product = sku ? getProductBySku(sku) : undefined;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <p style={{ color: "var(--navy-500)", margin: "16px 0 24px" }}>
          The requested medical device (SKU: {sku}) could not be located in the current catalogue.
        </p>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Browse All Products</span>
        </Link>
      </div>
    );
  }

  const stockInfo = formatStockDisplay(product.stockStatus, product.stockVerified);
  const priceInfo = formatPriceDisplay(product.price, product.priceVerified);

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleRequestQuote = () => {
    navigate(`/request-quote?sku=${encodeURIComponent(product.sku)}`);
  };

  return (
    <div className="container product-details-container">
      {/* Breadcrumb */}
      <div className="details-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Catalogue</Link>
        <span>/</span>
        <Link to={`/category/${product.categoryId}`}>{product.categoryName}</Link>
        <span>/</span>
        <span style={{ color: "var(--navy-800)", fontWeight: 600 }}>{product.name}</span>
      </div>

      {/* Main Product Hero (Split 2 Columns) */}
      <div className="product-details-hero">
        {/* Left: Gallery */}
        <ProductGallery
          mainImage={product.image}
          productName={product.name}
          sku={product.sku}
        />

        {/* Right: Product Info & Actions */}
        <div className="details-info">
          <div className="details-tag-row">
            <Badge variant="purple">{product.categoryName}</Badge>
            <Badge variant={stockInfo.badgeType}>{stockInfo.text}</Badge>
            {product.subcategory && (
              <span style={{ fontSize: "0.75rem", color: "var(--navy-500)", fontWeight: 600 }}>
                {product.subcategory}
              </span>
            )}
          </div>

          <h1 className="details-title">{product.name}</h1>

          <div className="details-sku-row">
            <span>
              SKU: <strong style={{ color: "var(--primary-700)" }}>{product.sku}</strong>
            </span>
            <span>•</span>
            <span>
              Brand:{" "}
              <strong>{product.brand ? product.brand : "Brand info to be confirmed"}</strong>
            </span>
            {product.model && (
              <>
                <span>•</span>
                <span>Model: {product.model}</span>
              </>
            )}
          </div>

          <p className="details-short-desc">{product.shortDescription}</p>

          {/* Pricing Box */}
          <div className="details-price-box">
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--primary-800)", fontWeight: 700, textTransform: "uppercase" }}>
                Commercial Pricing
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>
                {priceInfo.text}
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: "0.8125rem", color: "var(--primary-800)" }}>
              <div>Minimum Order: <strong>{product.minimumOrderQuantity} Unit</strong></div>
              <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>Institutional Slabs Available</div>
            </div>
          </div>

          {/* Quantity & Order Actions */}
          <div className="details-actions-row">
            <div className="details-qty-wrapper">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="qty-value-input"
              />
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ flex: 1 }}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  <span>Add to Procurement Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Actions */}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={handleRequestQuote}
            >
              <FileSpreadsheet size={16} />
              <span>Request a Quote</span>
            </button>
            <Link
              to="/contact"
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              <PhoneCall size={16} />
              <span>Contact Specialist</span>
            </Link>
          </div>

          {/* Assurance Notice */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", backgroundColor: "var(--navy-50)", borderRadius: "var(--radius-md)", fontSize: "0.75rem", color: "var(--navy-600)" }}>
            <Shield size={16} color="var(--primary-600)" style={{ flexShrink: 0 }} />
            <span>
              Quotation-based procurement ensures transparent hospital pricing, delivery schedules, and warranty alignment.
            </span>
          </div>
        </div>
      </div>

      {/* Structured Tabs: Overview, Tech Specs, Features, Docs, Warranty, Shipping, Returns */}
      <ProductTabs product={product} />
    </div>
  );
};
