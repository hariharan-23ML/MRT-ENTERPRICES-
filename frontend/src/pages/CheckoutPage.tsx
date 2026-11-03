import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { orderService } from "../services/orderService";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Building, MapPin, Truck, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { ShippingAddress } from "../types/order.types";

export const CheckoutPage: React.FC = () => {
  const { items, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [facilityName, setFacilityName] = useState(user?.organization || "");
  const [contactPerson, setContactPerson] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [taxIdOrGst, setTaxIdOrGst] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const shippingAddress: ShippingAddress = {
      facilityName,
      contactPerson,
      phone,
      email,
      addressLine1,
      city,
      state,
      postalCode,
      taxIdOrGst,
    };

    try {
      const order = await orderService.createOrder({
        customer: {
          id: user?.id,
          name: contactPerson,
          email,
          phone,
          organization: facilityName,
        },
        items: [...items],
        shippingAddress,
        notes,
        paymentMethod: "PURCHASE_ORDER",
      });

      clearCart();
      navigate(`/order-confirmation/${order.id}`, { state: { order } });
    } catch (err: any) {
      alert("Order submission encountered an issue: " + (err.message || "Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container checkout-page-container">
      <div style={{ marginBottom: "28px" }}>
        <Link
          to="/cart"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--navy-600)",
            fontSize: "0.875rem",
            marginBottom: "12px",
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Procurement Cart</span>
        </Link>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--navy-900)" }}>
          Institutional Checkout & Order Placement
        </h1>
        <p style={{ color: "var(--navy-500)", fontSize: "0.875rem" }}>
          Submit your official institutional purchase requisition. Commercial terms and delivery dispatch will be coordinated directly with your receiving department.
        </p>
      </div>

      <div className="checkout-grid-layout">
        <form className="checkout-form-card" onSubmit={handleSubmit}>
          {/* Section 1: Facility Information */}
          <div>
            <div className="checkout-section-title">
              <Building size={20} color="var(--primary-600)" />
              <span>Receiving Facility Details</span>
            </div>

            <div className="form-grid-2">
              <Input
                label="Hospital / Clinic Facility Name"
                type="text"
                placeholder="Apollo Health City"
                required
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
              />

              <Input
                label="Facility GSTIN / Tax ID"
                type="text"
                placeholder="33AAAAA0000A1Z5"
                value={taxIdOrGst}
                onChange={(e) => setTaxIdOrGst(e.target.value)}
              />
            </div>

            <div className="form-grid-3">
              <Input
                label="Receiving Authority / Officer"
                type="text"
                placeholder="Dr. S. Nair (Biomedical Eng.)"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />

              <Input
                label="Direct Contact Phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Input
                label="Official Communication Email"
                type="email"
                placeholder="biomedical@hospital.org"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div>
            <div className="checkout-section-title">
              <MapPin size={20} color="var(--primary-600)" />
              <span>Facility Delivery Address</span>
            </div>

            <Input
              label="Street Address / Ward / Gate"
              type="text"
              placeholder="Central Medical Store, Gate 3, Hospital Campus"
              required
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />

            <div className="form-grid-3">
              <Input
                label="City"
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
                label="Postal / PIN Code"
                type="text"
                placeholder="600001"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          {/* Section 3: Delivery Instructions */}
          <div>
            <div className="checkout-section-title">
              <Truck size={20} color="var(--primary-600)" />
              <span>Logistics & Installation Notes</span>
            </div>

            <div className="form-group">
              <label className="form-label">Special Delivery / Unloading Instructions</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="e.g. Requires service lift access, freight unloading dock, or biomedical engineer supervision on arrival..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight size={18} />}
          >
            Confirm & Submit Institutional Order
          </Button>
        </form>

        {/* Order Review Sidebar */}
        <div className="cart-summary-card">
          <h2 className="summary-title">Order Review</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "280px", overflowY: "auto" }}>
            {items.map((item) => (
              <div key={item.product.sku} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", borderBottom: "1px solid var(--navy-100)", paddingBottom: "8px" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>{item.product.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>SKU: {item.product.sku}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700 }}>x{item.quantity}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--primary-700)" }}>On Request</div>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-row" style={{ paddingTop: "12px", borderTop: "1px solid var(--navy-200)" }}>
            <span>Total Units:</span>
            <strong>{totalItems} items</strong>
          </div>

          <div className="summary-row">
            <span>Billing Protocol:</span>
            <span style={{ fontWeight: 700, color: "var(--primary-700)" }}>Institutional Invoice</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px", backgroundColor: "#ecfdf5", borderRadius: "var(--radius-md)", fontSize: "0.75rem", color: "var(--emerald-700)" }}>
            <ShieldCheck size={18} style={{ flexShrink: 0 }} />
            <span>Order backed by MRT Enterprises SLA & Logistics Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
