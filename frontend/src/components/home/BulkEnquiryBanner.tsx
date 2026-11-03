import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building, FileSpreadsheet } from "lucide-react";

export const BulkEnquiryBanner: React.FC = () => {
  return (
    <section className="container" aria-label="Bulk Procurement Enquiry">
      <div className="bulk-procurement-banner">
        <div className="bulk-banner-content">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary-300)", fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
            <Building size={16} />
            <span>INSTITUTIONAL & WHOLESALE CONTRACTS</span>
          </div>
          <h3>Looking for Medical Equipment in Bulk?</h3>
          <p>
            Send your institutional requirements and connect with our team for product quotations, technical documentation, and delivery schedules.
          </p>
        </div>

        <div className="bulk-banner-action">
          <Link to="/request-quote" className="btn">
            <FileSpreadsheet size={18} />
            <span>Request a Bulk Quote</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
