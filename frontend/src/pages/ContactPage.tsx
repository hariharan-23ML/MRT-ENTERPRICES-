import React, { useState } from "react";
import { BUSINESS_INFO } from "../utils/constants";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [facility, setFacility] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "72px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--navy-900)", marginBottom: "8px" }}>
          Contact MRT Enterprises Procurement Desk
        </h1>
        <p style={{ color: "var(--navy-600)", fontSize: "0.9375rem" }}>
          Connect directly with our biomedical equipment specialists, institutional support coordinators, and logistics team.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "40px" }}>
        {/* Contact Info Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--navy-200)", borderRadius: "var(--radius-xl)", padding: "32px", boxShadow: "var(--shadow-xs)" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "20px" }}>
              Direct Business Contacts
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-50)", color: "var(--primary-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                    Toll-Free Procurement Desk
                  </div>
                  <a href={`tel:${BUSINESS_INFO.phone}`} style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--primary-800)" }}>
                    {BUSINESS_INFO.phone}
                  </a>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
                    Assisting hospitals, nursing homes, and diagnostic labs nationwide
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-50)", color: "var(--primary-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                    Official Enquiries Email
                  </div>
                  <a href={`mailto:${BUSINESS_INFO.email}`} style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--primary-800)" }}>
                    {BUSINESS_INFO.email}
                  </a>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
                    Quotation requests, technical specs, and institutional proposals
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-50)", color: "var(--primary-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                    Logistics & Operations Hub
                  </div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy-800)" }}>
                    {BUSINESS_INFO.address}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-50)", color: "var(--primary-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                    Desk Operating Hours
                  </div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--navy-800)" }}>
                    {BUSINESS_INFO.hours}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="checkout-form-card">
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "4px" }}>
            Send an Institutional Message
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--navy-500)", marginBottom: "16px" }}>
            Fill in the details below and an MRT equipment coordinator will follow up directly.
          </p>

          {submitted ? (
            <div style={{ padding: "32px 16px", textAlign: "center" }}>
              <CheckCircle2 size={40} color="var(--emerald-600)" style={{ margin: "0 auto 12px" }} />
              <h3 style={{ fontSize: "1.125rem", fontWeight: 800, marginBottom: "6px" }}>
                Message Dispatched
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--navy-600)" }}>
                Thank you, {name}. A member of our procurement team will review your message and reply to {email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Input
                label="Your Name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Hospital / Organization Name"
                type="text"
                required
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              />

              <Input
                label="Corporate Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="form-group">
                <label className="form-label">Procurement Enquiry Details <span className="required">*</span></label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  required
                  placeholder="Tell us about the medical equipment categories, required quantities, or tender requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button type="submit" variant="primary" isFullWidth rightIcon={<Send size={16} />}>
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
