import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderService } from "../services/orderService";
import { Order } from "../types/order.types";
import { Badge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { formatDate } from "../utils/formatters";
import { Package, ArrowRight, Eye, Calendar, Building } from "lucide-react";

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "32px", paddingBottom: "64px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--navy-900)" }}>
          Procurement Orders & Requisitions
        </h1>
        <p style={{ color: "var(--navy-500)", fontSize: "0.875rem" }}>
          Monitor the lifecycle, documentation, and delivery status of your medical equipment orders.
        </p>
      </div>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--navy-500)" }}>
          Loading procurement orders...
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<Package size={36} />}
          title="No Orders Placed Yet"
          description="Your facility has not submitted any institutional purchase orders yet. Add items to your cart or submit an RFQ to begin."
          action={
            <Link to="/products" className="btn btn-primary">
              <span>Explore Products</span>
              <ArrowRight size={16} />
            </Link>
          }
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "var(--white)",
                border: "1px solid var(--navy-200)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr auto",
                alignItems: "center",
                gap: "20px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--primary-800)" }}>
                    {order.orderNumber}
                  </span>
                  <Badge variant="blue">{order.status}</Badge>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--navy-600)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Building size={14} />
                  <span>{order.shippingAddress?.facilityName || "Healthcare Facility"}</span>
                </div>
              </div>

              <div style={{ fontSize: "0.8125rem", color: "var(--navy-600)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <Calendar size={14} />
                  <span>Placed: {formatDate(order.createdAt)}</span>
                </div>
                <div>
                  <strong>{order.items.length}</strong> equipment line {order.items.length === 1 ? "item" : "items"}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--navy-500)", textTransform: "uppercase", fontWeight: 700 }}>
                  Billing Mode
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy-800)" }}>
                  Institutional PO
                </div>
              </div>

              <div>
                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
