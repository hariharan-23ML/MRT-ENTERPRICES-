import React from "react";
import { Phone, Mail, Award, ShieldCheck, Headphones } from "lucide-react";
import { BUSINESS_INFO } from "../../utils/constants";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="announcement-bar" role="banner">
      <div className="container">
        <div className="announcement-messages">
          <div className="announcement-item">
            <Award size={14} />
            <span>Bulk Orders & Special Pricing</span>
          </div>
          <div className="announcement-divider" />
          <div className="announcement-item">
            <ShieldCheck size={14} />
            <span>Genuine Product Information</span>
          </div>
          <div className="announcement-divider" />
          <div className="announcement-item">
            <Headphones size={14} />
            <span>Dedicated Business Support</span>
          </div>
        </div>

        <div className="announcement-contact">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="announcement-contact-link"
            aria-label="Direct Business Phone"
          >
            <Phone size={13} />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
          <div className="announcement-divider" />
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="announcement-contact-link"
            aria-label="Business Support Email"
          >
            <Mail size={13} />
            <span>{BUSINESS_INFO.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
