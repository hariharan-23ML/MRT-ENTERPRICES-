import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { DataTable, Column } from "../../components/admin/DataTable";
import { quotationService } from "../../services/quotationService";
import { QuotationRequest } from "../../types/quotation.types";
import { Badge } from "../../components/common/Badge";
import { formatDate } from "../../utils/formatters";

export const AdminQuotationsPage: React.FC = () => {
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);

  useEffect(() => {
    const list = quotationService.getQuotations();
    setQuotations(list);
  }, []);

  const columns: Column<QuotationRequest>[] = [
    {
      header: "RFQ Number",
      render: (q) => (
        <span style={{ fontWeight: 800, color: "var(--primary-800)" }}>
          {q.quotationNumber || q.id}
        </span>
      ),
      width: "18%",
    },
    {
      header: "Institution & Contact",
      render: (q) => (
        <div>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>
            {q.customerDetails.organizationName}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>
            {q.customerDetails.contactPerson} • {q.customerDetails.email}
          </div>
        </div>
      ),
      width: "32%",
    },
    {
      header: "Requested Equipment",
      render: (q) => (
        <div>
          {q.products.map((p, idx) => (
            <div key={idx} style={{ fontSize: "0.8125rem" }}>
              <strong>{p.productName}</strong> ({p.sku}) × {p.quantity}
            </div>
          ))}
        </div>
      ),
      width: "30%",
    },
    {
      header: "Urgency",
      render: (q) => (
        <Badge
          variant={
            q.urgencyLevel === "CRITICAL"
              ? "amber"
              : q.urgencyLevel === "EXPEDITED"
              ? "blue"
              : "purple"
          }
        >
          {q.urgencyLevel}
        </Badge>
      ),
      width: "12%",
    },
    {
      header: "Submission",
      render: (q) => <span>{formatDate(q.createdAt)}</span>,
      width: "14%",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title="Quotation Requests (RFQ Repository)"
          subtitle="Customer inquiries for volume hospital proposals and technical datasheets."
        />

        <div className="admin-body">
          <DataTable
            columns={columns}
            data={quotations}
            keyExtractor={(q) => q.id || q.quotationNumber || ""}
            emptyMessage="No customer quotation requests submitted yet."
          />
        </div>
      </div>
    </div>
  );
};
