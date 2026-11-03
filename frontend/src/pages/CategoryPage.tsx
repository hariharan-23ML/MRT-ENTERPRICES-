import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryById } from "../data/catalogue/categories";
import { getProductsByCategory } from "../data/catalogue/products";
import { ProductGrid } from "../components/products/ProductGrid";
import { ArrowLeft, Layers, ShieldCheck } from "lucide-react";

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || "");
  const products = categoryId ? getProductsByCategory(categoryId) : [];

  if (!category) {
    return (
      <div className="container" style={{ padding: "64px 20px", textAlign: "center" }}>
        <h2>Category Not Found</h2>
        <p style={{ color: "var(--navy-500)", margin: "16px 0 24px" }}>
          The requested medical category could not be located in our catalogue.
        </p>
        <Link to="/products" className="btn btn-primary">
          Back to All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "28px", paddingBottom: "64px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "var(--navy-500)", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Categories</Link>
        <span>/</span>
        <span style={{ color: "var(--navy-800)", fontWeight: 600 }}>{category.name}</span>
      </div>

      {/* Category Header Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)",
          borderRadius: "var(--radius-xl)",
          color: "var(--white)",
          padding: "36px 44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
          marginBottom: "36px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255, 255, 255, 0.15)", padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "12px" }}>
            <Layers size={14} />
            <span>{category.id}</span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--white)", marginBottom: "10px" }}>
            {category.name}
          </h1>
          <p style={{ color: "#c7d2fe", fontSize: "0.9375rem", maxWidth: "620px", lineHeight: "1.5" }}>
            {category.description}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "10px 18px", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
            <div style={{ fontSize: "1.75rem", fontWeight: 800 }}>{products.length}</div>
            <div style={{ fontSize: "0.75rem", color: "#e0e7ff" }}>Products Listed</div>
          </div>
          <Link to="/products" style={{ color: "var(--white)", fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowLeft size={14} />
            <span>All Categories</span>
          </Link>
        </div>
      </div>

      {/* Product Grid for this category */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>
            Available Equipment ({products.length})
          </h2>
          <div style={{ fontSize: "0.8125rem", color: "var(--navy-500)", display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={16} color="var(--primary-600)" />
            <span>Commercial Price on Request</span>
          </div>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
};
