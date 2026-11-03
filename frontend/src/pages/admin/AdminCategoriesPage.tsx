import React from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { DataTable, Column } from "../../components/admin/DataTable";
import { CATEGORIES } from "../../data/catalogue/categories";
import { Category } from "../../types/category.types";
import { Badge } from "../../components/common/Badge";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export const AdminCategoriesPage: React.FC = () => {
  const columns: Column<Category>[] = [
    {
      header: "Category ID",
      render: (c) => (
        <span style={{ fontWeight: 800, color: "var(--primary-700)" }}>{c.id}</span>
      ),
      width: "14%",
    },
    {
      header: "Category Name",
      render: (c) => (
        <div>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>{c.name}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>{c.description}</div>
        </div>
      ),
      width: "44%",
    },
    {
      header: "Product Count",
      render: (c) => <strong>{c.productCount} items</strong>,
      width: "16%",
    },
    {
      header: "Status",
      render: (c) => <Badge variant="green">{c.status}</Badge>,
      width: "14%",
    },
    {
      header: "Action",
      render: (c) => (
        <Link
          to={`/category/${c.id}`}
          className="btn btn-ghost btn-sm"
          title="View Category Page"
          style={{ padding: "4px" }}
        >
          <Eye size={16} />
        </Link>
      ),
      width: "12%",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title="Medical Categories Management"
          subtitle="All 12 medical equipment disciplines imported from product categories and samples.xlsx."
        />

        <div className="admin-body">
          <DataTable
            columns={columns}
            data={CATEGORIES}
            keyExtractor={(c) => c.id}
          />
        </div>
      </div>
    </div>
  );
};
