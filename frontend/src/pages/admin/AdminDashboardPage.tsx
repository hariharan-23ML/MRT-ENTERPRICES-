import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { StatsCard } from "../../components/admin/StatsCard";
import { DataTable, Column } from "../../components/admin/DataTable";
import { PRODUCTS } from "../../data/catalogue/products";
import { CATEGORIES } from "../../data/catalogue/categories";
import { orderService } from "../../services/orderService";
import { quotationService } from "../../services/quotationService";
import { Order } from "../../types/order.types";
import { QuotationRequest } from "../../types/quotation.types";
import {
  Package,
  Layers,
  ShoppingBag,
  FileSpreadsheet,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters";

export const AdminDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await orderService.getOrders();
        const rfqData = quotationService.getQuotations();
        setOrders(orderData);
        setQuotations(rfqData);
      } catch {
        // Ignored
      }
    };
    fetchData();
  }, []);

  const orderColumns: Column<Order>[] = [
    { header: "Order #", accessor: "orderNumber", width: "18%" },
    {
      header: "Institution / Facility",
      render: (o) => (
        <div>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>
            {o.shippingAddress?.facilityName || o.customer.name}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
            {o.customer.email}
          </div>
        </div>
      ),
      width: "32%",
    },
    {
      header: "Line Items",
      render: (o) => <span>{o.items.length} products</span>,
      width: "16%",
    },
    {
      header: "Status",
      render: (o) => (
        <span className="badge badge-purple">{o.status}</span>
      ),
      width: "18%",
    },
    {
      header: "Date",
      render: (o) => <span>{formatDate(o.createdAt)}</span>,
      width: "16%",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title="Executive Operations Console"
          subtitle="Enterprise overview of medical inventory, institutional orders, and procurement quotations."
          action={
            <Link to="/admin/products/add" className="btn btn-primary btn-sm">
              <Plus size={14} />
              <span>Add Product</span>
            </Link>
          }
        />

        <div className="admin-body">
          {/* Key Metric Stats Cards */}
          <div className="stats-grid">
            <StatsCard
              label="Active Catalogue Products"
              value={PRODUCTS.length}
              icon={<Package size={24} />}
              color="var(--primary-600)"
              change="Full Excel Catalogue Loaded"
            />
            <StatsCard
              label="Standard Equipment Categories"
              value={CATEGORIES.length}
              icon={<Layers size={24} />}
              color="var(--blue-600)"
              change="12 Active Disciplines"
            />
            <StatsCard
              label="Logged Purchase Orders"
              value={orders.length}
              icon={<ShoppingBag size={24} />}
              color="var(--emerald-600)"
              change="Active Requisitions"
            />
            <StatsCard
              label="Quotation Inquiries (RFQ)"
              value={quotations.length}
              icon={<FileSpreadsheet size={24} />}
              color="var(--amber-500)"
              change="Client RFQ Repository"
            />
          </div>

          {/* Quick Actions & Recent Orders Table */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy-900)" }}>
                Recent Institutional Purchase Orders
              </h2>
              <Link to="/admin/orders" style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--primary-600)", display: "flex", alignItems: "center", gap: "4px" }}>
                <span>View All Orders</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <DataTable
              columns={orderColumns}
              data={orders.slice(0, 5)}
              keyExtractor={(o) => o.id}
              emptyMessage="No institutional purchase orders recorded yet."
            />
          </div>

          {/* Data Integrity Summary */}
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--navy-200)", borderRadius: "var(--radius-xl)", padding: "24px", boxShadow: "var(--shadow-xs)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "8px", color: "var(--navy-900)" }}>
              Data Integrity & Verification Status
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--navy-600)", lineHeight: "1.6" }}>
              In accordance with enterprise medical regulations, all 60 products imported from <code>product categories and samples.xlsx</code> remain marked as <strong>Illustrative Planning Data</strong> until authorized supplier pricing, datasheets, and certificates are validated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
