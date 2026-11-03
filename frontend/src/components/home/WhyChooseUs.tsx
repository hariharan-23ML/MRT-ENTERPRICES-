import React from "react";
import { Link } from "react-router-dom";
import { Layers, Building2, FileText, Headphones, ArrowRight } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  return (
    <aside className="why-choose-card" aria-labelledby="why-choose-heading">
      <div className="why-choose-header">
        <div className="why-choose-badge">VALUE PROPOSITION</div>
        <h2 id="why-choose-heading" className="why-choose-title">
          Why Choose MRT Enterprises?
        </h2>
      </div>

      <div className="why-choose-list">
        {/* 1. Wide Product Range */}
        <div className="why-item">
          <div className="why-icon-circle">
            <Layers size={18} />
          </div>
          <div className="why-content">
            <h3 className="why-heading">Wide Product Range</h3>
            <p className="why-desc">
              Explore medical equipment across multiple categories.
            </p>
          </div>
        </div>

        {/* 2. Bulk Procurement */}
        <div className="why-item">
          <div className="why-icon-circle">
            <Building2 size={18} />
          </div>
          <div className="why-content">
            <h3 className="why-heading">Bulk Procurement</h3>
            <p className="why-desc">
              Enquire about institutional and wholesale requirements.
            </p>
          </div>
        </div>

        {/* 3. Product Information */}
        <div className="why-item">
          <div className="why-icon-circle">
            <FileText size={18} />
          </div>
          <div className="why-content">
            <h3 className="why-heading">Product Information</h3>
            <p className="why-desc">
              Access specifications and available product documentation.
            </p>
          </div>
        </div>

        {/* 4. Business Support */}
        <div className="why-item">
          <div className="why-icon-circle">
            <Headphones size={18} />
          </div>
          <div className="why-content">
            <h3 className="why-heading">Business Support</h3>
            <p className="why-desc">
              Contact the team for product and procurement enquiries.
            </p>
          </div>
        </div>
      </div>

      <div className="why-card-footer">
        <Link to="/request-quote" className="why-enquiry-link">
          <span>Submit Institutional Enquiry</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </aside>
  );
};
