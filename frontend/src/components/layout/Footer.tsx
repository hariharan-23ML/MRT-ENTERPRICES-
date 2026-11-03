import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../../utils/constants";
import { CATEGORIES } from "../../data/catalogue/categories";

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Brand & Overview */}
          <div className="footer-brand">
            <h4>{BUSINESS_INFO.brand}</h4>
            <div className="footer-subtitle">{BUSINESS_INFO.tagline}</div>
            <p className="footer-desc">
              Premier B2B medical equipment procurement platform providing certified healthcare solutions, diagnostic instruments, and surgical supplies for hospitals, laboratories, and institutions.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/request-quote" className="btn btn-sm btn-primary">
                Institutional RFQ
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Top Categories */}
          <div className="footer-column">
            <h5>Key Categories</h5>
            <div className="footer-links">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <Link key={cat.id} to={`/category/${cat.id}`} className="footer-link">
                  {cat.name}
                </Link>
              ))}
              <Link to="/products" className="footer-link" style={{ color: "var(--primary-400)", fontWeight: 600 }}>
                View All 12 Categories →
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h5>Customer Support</h5>
            <div className="footer-links">
              <Link to="/products" className="footer-link">Product Catalogue</Link>
              <Link to="/orders" className="footer-link">Track Orders</Link>
              <Link to="/request-quote" className="footer-link">Request a Quote</Link>
              <Link to="/contact" className="footer-link">Contact Support Desk</Link>
              <Link to="/login" className="footer-link">Institutional Login</Link>
            </div>
          </div>

          {/* Business & Legal */}
          <div className="footer-column">
            <h5>Corporate</h5>
            <div className="footer-links">
              <Link to="/contact" className="footer-link">About MRT Enterprises</Link>
              <Link to="/contact" className="footer-link">Procurement Desk</Link>
              <Link to="/contact" className="footer-link">Quality Assurance</Link>
              <Link to="/contact" className="footer-link">Return & Warranty Policy</Link>
              <Link to="/contact" className="footer-link">Terms & Conditions</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-column">
            <h5>Procurement Desk</h5>
            <div className="footer-contact-item">
              <Phone size={16} />
              <div>
                <a href={`tel:${BUSINESS_INFO.phone}`} style={{ color: "var(--white)", fontWeight: 700 }}>
                  {BUSINESS_INFO.phone}
                </a>
                <div style={{ fontSize: "0.75rem", color: "var(--navy-400)" }}>Toll-Free Institutional Hotline</div>
              </div>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <div>
                <a href={`mailto:${BUSINESS_INFO.email}`} style={{ color: "var(--white)", fontWeight: 700 }}>
                  {BUSINESS_INFO.email}
                </a>
                <div style={{ fontSize: "0.75rem", color: "var(--navy-400)" }}>Quotation & Order Enquiries</div>
              </div>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <div>
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <Clock size={16} />
              <div>
                <span>{BUSINESS_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. MediSource B2B Healthcare Marketplace.
          </div>
          <div className="footer-bottom-links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms of Sale</Link>
            <Link to="/contact">Disclaimer: Illustrative Data Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
