import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Order } from "../types/order.types";
import { orderService } from "../services/orderService";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../utils/constants";
import { formatDate } from "../utils/formatters";

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>((location.state as any)?.order || null);
  const [loading, setLoading] = useState<boolean>(!order);

  useEffect(() => {
    if (!order && orderId) {
      const fetchOrder = async () => {
        try {
          const data = await orderService.getOrderById(orderId);
          if (data) setOrder(data);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [order, orderId]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h3>Loading order details...</h3>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <div className="checkout-form-card" style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#ecfdf5", color: "var(--emerald-600)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <CheckCircle2 size={42} />
        </div>

        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--navy-900)" }}>
          Order Confirmed & Logged
        </h1>

        <p style={{ color: "var(--navy-600)", fontSize: "0.9375rem", maxWidth: "560px", margin: "0 auto 24px" }}>
          Thank you. Your institutional purchase order has been logged in the MediSource procurement registry. Our logistics and customer support desk will reach out with the tracking dispatch details.
        </p>

        {order && (
          <div style={{ backgroundColor: "var(--navy-50)", border: "1px solid var(--navy-200)", borderRadius: "var(--radius-lg)", padding: "24px", textAlign: "left", marginBottom: "28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", borderBottom: "1px solid var(--navy-200)", paddingBottom: "16px", marginBottom: "16px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                  Order Number
                </div>
                <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--primary-700)" }}>
                  {order.orderNumber}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                  Submission Date
                </div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                  {formatDate(order.createdAt)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                Ordered Medical Equipment ({order.items.length} items)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", borderBottom: "1px dashed var(--navy-200)", paddingBottom: "6px" }}>
                    <span>
                      <strong>{item.product.name}</strong> ({item.product.sku})
                    </span>
                    <span style={{ fontWeight: 700 }}>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                Receiving Delivery Authority
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--navy-800)" }}>
                {order.shippingAddress.facilityName} – {order.shippingAddress.contactPerson} ({order.shippingAddress.phone})
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--navy-600)" }}>
                {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Link to="/orders" className="btn btn-primary">
            <Package size={16} />
            <span>View All My Orders</span>
          </Link>

          <Link to="/products" className="btn btn-outline">
            <span>Continue Catalogue Browsing</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ marginTop: "24px", fontSize: "0.8125rem", color: "var(--navy-500)" }}>
          Need urgent modifications? Contact the MRT Procurement Desk at{" "}
          <a href={`tel:${BUSINESS_INFO.phone}`} style={{ color: "var(--primary-600)", fontWeight: 700 }}>
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
