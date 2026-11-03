import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { DataTable, Column } from "../../components/admin/DataTable";
import { PRODUCTS } from "../../data/catalogue/products";
import { CATEGORIES } from "../../data/catalogue/categories";
import { Product } from "../../types/product.types";
import { Badge } from "../../components/common/Badge";
import { Plus, Search, Edit3, Eye } from "lucide-react";

export const AdminProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === "ALL" || p.categoryId === selectedCat;
    return matchesSearch && matchesCat;
  });

  const columns: Column<Product>[] = [
    {
      header: "SKU",
      render: (p) => (
        <span style={{ fontFamily: "monospace", fontWeight: 700, color: "var(--primary-700)" }}>
          {p.sku}
        </span>
      ),
      width: "14%",
    },
    {
      header: "Product Name",
      render: (p) => (
        <div>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>{p.name}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>{p.subcategory}</div>
        </div>
      ),
      width: "36%",
    },
    {
      header: "Category",
      accessor: "categoryName",
      width: "22%",
    },
    {
      header: "Verification",
      render: () => (
        <Badge variant="amber">Illustrative</Badge>
      ),
      width: "14%",
    },
    {
      header: "Actions",
      render: (p) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            to={`/product/${p.sku}`}
            className="btn btn-ghost btn-sm"
            title="Preview Product"
            style={{ padding: "4px" }}
          >
            <Eye size={15} />
          </Link>
          <Link
            to={`/admin/products/edit/${p.sku}`}
            className="btn btn-ghost btn-sm"
            title="Edit Product"
            style={{ padding: "4px" }}
          >
            <Edit3 size={15} />
          </Link>
        </div>
      ),
      width: "14%",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title="Product Catalogue Management"
          subtitle={`Total ${PRODUCTS.length} standard medical devices loaded from Excel.`}
          action={
            <Link to="/admin/products/add" className="btn btn-primary btn-sm">
              <Plus size={14} />
              <span>Add Product</span>
            </Link>
          }
        />

        <div className="admin-body">
          <div className="data-table-container">
            <div className="table-toolbar">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Search size={16} color="var(--navy-400)" />
                  <input
                    type="text"
                    className="table-search-input"
                    placeholder="Filter by product name, SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="form-select"
                  style={{ width: "auto", padding: "8px 12px", fontSize: "0.8125rem" }}
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                >
                  <option value="ALL">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ fontSize: "0.8125rem", color: "var(--navy-500)" }}>
                Showing {filtered.length} of {PRODUCTS.length} products
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filtered}
              keyExtractor={(p) => p.sku}
              emptyMessage="No medical devices matched your filter."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
