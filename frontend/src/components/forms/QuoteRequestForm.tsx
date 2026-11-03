import React, { useState } from "react";
import { PRODUCTS } from "../../data/catalogue/products";
import { QuotationRequest } from "../../types/quotation.types";
import { quotationService } from "../../services/quotationService";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { CheckCircle2, FileSpreadsheet, Info } from "lucide-react";

interface QuoteRequestFormProps {
  initialSku?: string;
}

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ initialSku = "" }) => {
  const [sku, setSku] = useState<string>(initialSku || PRODUCTS[0].sku);
  const [quantity, setQuantity] = useState<number>(1);
  const [orgName, setOrgName] = useState<string>("");
  const [facilityType, setFacilityType] = useState<any>("HOSPITAL");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [additionalRequirements, setAdditionalRequirements] = useState<string>("");
  const [urgency, setUrgency] = useState<any>("STANDARD");

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [rfqNumber, setRfqNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [endpointNotice, setEndpointNotice] = useState<string>("");

  const selectedProduct = PRODUCTS.find((p) => p.sku === sku) || PRODUCTS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: QuotationRequest = {
      customerDetails: {
        organizationName: orgName,
        facilityType,
        contactPerson,
        email,
        phone,
        deliveryCity: city,
        deliveryState: state,
        pincode,
      },
      products: [
        {
          sku: selectedProduct.sku,
          productName: selectedProduct.name,
          quantity,
        },
      ],
      deliveryLocation: `${city}, ${state} - ${pincode}`,
      additionalRequirements,
      urgencyLevel: urgency,
    };

    const result = await quotationService.submitQuotation(payload);
    setIsSubmitting(false);
    setSubmitted(true);
    setRfqNumber(result.quotation.quotationNumber || `MRT-RFQ-${Date.now().toString().slice(-6)}`);

    if (!result.endpointSupported) {
      setEndpointNotice(
        "Notice: The backend server currently does not expose a dedicated POST /api/quotations endpoint. Your RFQ has been securely captured in the client repository for administrative review."
      );
    }
  };

  if (submitted) {
    return (
      <div className="auth-card" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#ecfdf5", color: "var(--emerald-600)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <CheckCircle2 size={36} />
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "8px" }}>
          Quotation Request Submitted
        </h2>
        <p style={{ color: "var(--navy-600)", fontSize: "0.875rem", marginBottom: "20px" }}>
          Reference Number: <strong style={{ color: "var(--primary-700)" }}>{rfqNumber}</strong>
        </p>
        <p style={{ color: "var(--navy-600)", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "24px" }}>
          Thank you, {contactPerson}. Our procurement specialist for <strong>{selectedProduct.categoryName}</strong> will contact {email} within 1 business day with official supplier proposals.
        </p>
        {endpointNotice && (
          <div style={{ backgroundColor: "var(--primary-50)", border: "1px solid var(--primary-200)", padding: "12px", borderRadius: "var(--radius-md)", fontSize: "0.75rem", color: "var(--primary-900)", textAlign: "left", marginBottom: "24px" }}>
            <Info size={14} style={{ display: "inline", marginRight: "6px" }} />
            {endpointNotice}
          </div>
        )}
        <Button variant="primary" onClick={() => setSubmitted(false)}>
          Submit Another Quotation
        </Button>
      </div>
    );
  }

  return (
    <form className="checkout-form-card" onSubmit={handleSubmit}>
      <div className="checkout-section-title">
        <FileSpreadsheet size={20} color="var(--primary-600)" />
        <span>Product Selection</span>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">
            Target Product <span className="required">*</span>
          </label>
          <select
            className="form-select"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          >
            {PRODUCTS.map((p) => (
              <option key={p.sku} value={p.sku}>
                [{p.sku}] {p.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Required Quantity (Units)"
          type="number"
          min={1}
          required
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
      </div>

      <div className="checkout-section-title">
        <span>Healthcare Institution & Contact</span>
      </div>

      <div className="form-grid-2">
        <Input
          label="Institution / Hospital Name"
          type="text"
          placeholder="Apex Super Speciality Hospital"
          required
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />

        <div className="form-group">
          <label className="form-label">Facility Classification</label>
          <select
            className="form-select"
            value={facilityType}
            onChange={(e) => setFacilityType(e.target.value)}
          >
            <option value="HOSPITAL">Tertiary / General Hospital</option>
            <option value="CLINIC">Speciality Clinic</option>
            <option value="DIAGNOSTIC_LAB">Diagnostic & Pathology Lab</option>
            <option value="DISTRIBUTOR">Medical Distributor / Reseller</option>
            <option value="OTHER">Government / NGO / Other</option>
          </select>
        </div>
      </div>

      <div className="form-grid-3">
        <Input
          label="Contact Authority"
          type="text"
          placeholder="Dr. S. Ramesh"
          required
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
        />

        <Input
          label="Corporate Email"
          type="email"
          placeholder="procurement@apexhealth.in"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="checkout-section-title">
        <span>Delivery Location & Logistics</span>
      </div>

      <div className="form-grid-3">
        <Input
          label="Delivery City"
          type="text"
          placeholder="Chennai"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Input
          label="State"
          type="text"
          placeholder="Tamil Nadu"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <Input
          label="PIN / Postal Code"
          type="text"
          placeholder="600001"
          required
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Procurement Urgency</label>
        <select
          className="form-select"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        >
          <option value="STANDARD">Standard Procurement (2-4 Weeks)</option>
          <option value="EXPEDITED">Expedited Expansion (1-2 Weeks)</option>
          <option value="CRITICAL">Emergency Replacement (Immediate)</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Specific Configuration or Accessory Requests</label>
        <textarea
          className="form-textarea"
          rows={3}
          placeholder="Specify required probe configurations, voltage compatibility, extended warranty packages, or installation terms..."
          value={additionalRequirements}
          onChange={(e) => setAdditionalRequirements(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
      >
        Submit Official Request for Quotation
      </Button>
    </form>
  );
};
