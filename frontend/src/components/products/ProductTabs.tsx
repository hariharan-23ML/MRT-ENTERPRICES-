import React, { useState } from "react";
import { Product } from "../../types/product.types";
import { ProductSpecifications } from "./ProductSpecifications";
import { FileText, ShieldAlert, Truck, RotateCcw, CheckCircle2 } from "lucide-react";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<string>("specs");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specs", label: "Technical Specifications" },
    { id: "features", label: "Features & Benefits" },
    { id: "documents", label: "Documents" },
    { id: "warranty", label: "Warranty & Service" },
    { id: "shipping", label: "Shipping Information" },
    { id: "returns", label: "Return Policy" },
  ];

  return (
    <div className="product-tabs-container">
      <div className="tabs-nav-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-nav-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content-panel">
        {activeTab === "overview" && (
          <div>
            <h4 style={{ fontSize: "1.125rem", marginBottom: "12px", color: "var(--navy-900)" }}>
              Product Overview
            </h4>
            <p style={{ lineHeight: "1.7", color: "var(--navy-700)", marginBottom: "16px" }}>
              {product.description}
            </p>
            <div style={{ padding: "14px", backgroundColor: "var(--navy-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--navy-200)", fontSize: "0.8125rem", color: "var(--navy-600)" }}>
              <strong>Notice:</strong> All product specifications, brand indicators, and configuration options represent planning information. Please contact the MRT Enterprises procurement desk for certified manufacturer proposals.
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div>
            <h4 style={{ fontSize: "1.125rem", marginBottom: "16px", color: "var(--navy-900)" }}>
              Technical Specifications for SKU: {product.sku}
            </h4>
            <ProductSpecifications sku={product.sku} fallbackSpecs={product.specifications} />
          </div>
        )}

        {activeTab === "features" && (
          <div>
            <h4 style={{ fontSize: "1.125rem", marginBottom: "16px", color: "var(--navy-900)" }}>
              Features & Benefits
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {product.features.map((feature, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.875rem", color: "var(--navy-700)" }}>
                  <CheckCircle2 size={18} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <h4 style={{ fontSize: "1.125rem", marginBottom: "16px", color: "var(--navy-900)" }}>
              Product Documentation
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ border: "1px solid var(--navy-200)", borderRadius: "var(--radius-md)", padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
                <FileText size={24} color="var(--primary-600)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>Manufacturer Datasheet</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
                    {product.documents.datasheetPdf || "Upload manufacturer-approved datasheet PDF"}
                  </div>
                </div>
              </div>

              <div style={{ border: "1px solid var(--navy-200)", borderRadius: "var(--radius-md)", padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
                <FileText size={24} color="var(--primary-600)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>Instructions for Use (IFU)</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
                    {product.documents.userManual || "Upload manufacturer-approved user manual"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "warranty" && (
          <div>
            <h4 style={{ fontSize: "1.125rem", marginBottom: "12px", color: "var(--navy-900)" }}>
              Warranty & Service Coverage
            </h4>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
              <ShieldAlert size={20} color="var(--primary-600)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: "0.875rem", color: "var(--navy-700)", lineHeight: "1.6" }}>
                {product.warrantyService || `${product.warranty} (illustrative); confirm written warranty, service level agreements (SLA), preventative maintenance, and spare parts availability with supplier upon quotation.`}
              </p>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h4 style={{ fontSize: "1.125rem", marginBottom: "12px", color: "var(--navy-900)" }}>
              Shipping & Logistics
            </h4>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <Truck size={20} color="var(--primary-600)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: "0.875rem", color: "var(--navy-700)", lineHeight: "1.6" }}>
                {product.shippingInfo || "Institutional delivery via specialized cold-chain and medical logistics carriers. Lead time, installation protocols, freight charges, and receiving authority coordination confirmed on purchase order."}
              </p>
            </div>
          </div>
        )}

        {activeTab === "returns" && (
          <div>
            <h4 style={{ fontSize: "1.125rem", marginBottom: "12px", color: "var(--navy-900)" }}>
              Return & Quality Inspection Policy
            </h4>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <RotateCcw size={20} color="var(--primary-600)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: "0.875rem", color: "var(--navy-700)", lineHeight: "1.6" }}>
                {product.returnPolicy || "Medical devices and sterile supplies are subject to stringent regulatory inspection, hygiene protocols, and unopened seal validation prior to return authorization."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
