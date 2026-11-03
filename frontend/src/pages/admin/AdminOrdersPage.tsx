import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { DataTable, Column } from "../../components/admin/DataTable";
import { orderService } from "../../services/orderService";
import { Order } from "../../types/order.types";
import { Badge } from "../../components/common/Badge";
import { formatDate } from "../../utils/formatters";

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await orderService.getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const columns: Column<Order>[] = [
    {
      header: "Order Number",
      render: (o) => (
        <span style={{ fontWeight: 800, color: "var(--primary-800)" }}>{o.orderNumber}</span>
      ),
      width: "18%",
    },
    {
      header: "Healthcare Facility / Officer",
      render: (o) => (
        <div>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>
            {o.shippingAddress?.facilityName || o.customer.name}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
            {o.customer.email} • {o.shippingAddress?.phone}
          </div>
        </div>
      ),
      width: "36%",
    },
    {
      header: "Equipment Lines",
      render: (o) => <span>{o.items.length} products</span>,
      width: "16%",
    },
    {
      header: "Status",
      render: (o) => <Badge variant="blue">{o.status}</Badge>,
      width: "14%",
    },
    {
      header: "Placed Date",
      render: (o) => <span>{formatDate(o.createdAt)}</span>,
      width: "16%",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title="Institutional Purchase Orders"
          subtitle="Orders logged through the customer checkout and procurement cart."
        />

        <div className="admin-body">
          <DataTable
            columns={columns}
            data={orders}
            keyExtractor={(o) => o.id}
            emptyMessage="No institutional purchase orders recorded."
          />
        </div>
      </div>
    </div>
  );
};
