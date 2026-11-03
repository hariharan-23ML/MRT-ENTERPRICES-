import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { CategorySection } from "../components/home/CategorySection";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { BulkEnquiryBanner } from "../components/home/BulkEnquiryBanner";
import { ShieldCheck, FileText, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page-view">
      {/* 3.3 Main Hero Banner + 3.4 Why Choose Us Card */}
      <HeroSection />

      {/* Part 4: 12 Product Categories Horizontal Strip */}
      <CategorySection />

      {/* Part 5: Product Catalogue Preview (Sidebar Filters + 6-col Grid) */}
      <FeaturedProducts />

      {/* Part 7: Bulk Procurement Banner */}
      <BulkEnquiryBanner />

      {/* Part 7: Product Information & Verification Benefits */}
      <section className="product-info-section" aria-labelledby="product-info-heading">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 36px" }}>
            <h2 id="product-info-heading" style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--navy-900)", marginBottom: "8px" }}>
              Enterprise Healthcare Procurement Standards
            </h2>
            <p style={{ color: "var(--navy-600)", fontSize: "0.9375rem" }}>
              How MRT Enterprises coordinates verified specifications, institutional quotations, and specialized clinical logistics.
            </p>
          </div>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-card-icon">
                <FileText size={24} />
              </div>
              <h4>Detailed Technical Specifications</h4>
              <p>
                Access structured parameter tables covering 311+ data points across patient monitoring, critical care ventilators, surgical imaging, and diagnostic equipment.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <ShieldCheck size={24} />
              </div>
              <h4>Manufacturer Grounded Proposals</h4>
              <p>
                Commercial quotations are prepared in direct coordination with authorized equipment manufacturers to ensure accurate model numbers, warranty terms, and service coverage.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <Truck size={24} />
              </div>
              <h4>Specialized Institutional Logistics</h4>
              <p>
                From heavy diagnostic installations to sterile consumables, our healthcare supply chain manages receiving coordination, lead times, and freight protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 7: Simple Enquiry Call to Action */}
      <section className="container" style={{ paddingBottom: "64px" }}>
        <div
          style={{
            backgroundColor: "var(--white)",
            border: "1px solid var(--primary-200)",
            borderRadius: "var(--radius-xl)",
            padding: "36px 44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--navy-900)", marginBottom: "6px" }}>
              Need Assistance With Equipment Planning?
            </h3>
            <p style={{ color: "var(--navy-600)", fontSize: "0.875rem", margin: 0 }}>
              Speak with our biomedical procurement team for specialized hospital ward, OT, or diagnostic laboratory outfitting.
            </p>
          </div>
          <Link to="/contact" className="btn btn-secondary">
            <span>Contact Procurement Desk</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};
