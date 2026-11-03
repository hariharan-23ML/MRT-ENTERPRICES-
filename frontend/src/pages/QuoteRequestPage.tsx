import React from "react";
import { useSearchParams } from "react-router-dom";
import { QuoteRequestForm } from "../components/forms/QuoteRequestForm";
import { FileSpreadsheet, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export const QuoteRequestPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSku = searchParams.get("sku") || "";

  return (
    <div className="container" style={{ paddingTop: "32px", paddingBottom: "64px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto 32px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "var(--primary-100)", color: "var(--primary-700)", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "12px" }}>
          <FileSpreadsheet size={15} />
          <span>REQUEST FOR QUOTATION (RFQ)</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--navy-900)", marginBottom: "8px" }}>
          Official Medical Equipment Quotation
        </h1>
        <p style={{ color: "var(--navy-600)", fontSize: "0.9375rem", lineHeight: "1.5" }}>
          Submit your institution’s equipment requirements. Our procurement desk will issue formal manufacturer-authorized proposals, delivery lead times, and tier-based commercial pricing.
        </p>

        {/* 3 Value Badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px", fontSize: "0.8125rem", color: "var(--navy-700)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle size={16} color="var(--primary-600)" />
            <span>Volume Pricing Slabs</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={16} color="var(--primary-600)" />
            <span>Technical Datasheet Included</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Clock size={16} color="var(--primary-600)" />
            <span>24-Hour Desk Turnaround</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <QuoteRequestForm initialSku={initialSku} />
      </div>
    </div>
  );
};
