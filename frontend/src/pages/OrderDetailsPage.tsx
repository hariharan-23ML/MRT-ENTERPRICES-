import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { orderService } from "../services/orderService";
import { Order } from "../types/order.types";
import { Badge } from "../components/common/Badge";
import { ArrowLeft, Building, MapPin, Truck } from "lucide-react";
import { formatDate } from "../utils/formatters";

export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (orderId) {
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
  }, [orderId]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h3>Loading order details...</h3>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Order Not Found</h2>
        <p style={{ color: "var(--navy-500)", margin: "16px 0 24px" }}>
          We could not find an order matching identifier #{orderId}.
        </p>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "32px", paddingBottom: "64px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link
          to="/orders"
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
          <span>Back to All Orders</span>
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--navy-900)" }}>
              Order {order.orderNumber}
            </h1>
            <p style={{ color: "var(--navy-500)", fontSize: "0.875rem" }}>
              Logged on {formatDate(order.createdAt)}
            </p>
          </div>
          <Badge variant="blue">{order.status}</Badge>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px" }}>
        {/* Left: Items Table */}
        <div className="cart-items-card">
          <h2 style={{ fontSize: "1.125rem", fontWeight: 800, marginBottom: "16px" }}>
            Requisition Items ({order.items.length})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {order.items.map((item: any, idx: number) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--navy-100)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "50px",
                      backgroundColor: "#f8fafc",
                      borderRadius: "6px",
                      border: "1px solid var(--navy-200)",
                      overflow: "hidden",
                      padding: "4px",
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/placeholders/medical-device-placeholder.svg";
                      }}
                    />
                  </div>
                  <div>
                    <Link
                      to={`/product/${item.product.sku}`}
                      style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--navy-900)" }}
                    >
                      {item.product.name}
                    </Link>
                    <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", fontFamily: "monospace" }}>
                      SKU: {item.product.sku}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>Quantity: {item.quantity}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--primary-700)", fontWeight: 600 }}>
                    Commercial Quotation
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Shipping & Facility Information */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="cart-summary-card" style={{ position: "static" }}>
            <h2 className="summary-title">Receiving Authority</h2>
            <div style={{ fontSize: "0.875rem", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Building size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <strong>{order.shippingAddress.facilityName}</strong>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>
                  {order.shippingAddress.addressLine1}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Truck size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>
                  Officer: {order.shippingAddress.contactPerson} ({order.shippingAddress.phone})
                </span>
              </div>
            </div>

            {order.notes && (
              <div style={{ marginTop: "12px", padding: "10px", backgroundColor: "var(--navy-50)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem" }}>
                <strong>Logistics Notes:</strong> {order.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
