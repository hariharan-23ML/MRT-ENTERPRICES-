import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { getProductBySku } from "../../data/catalogue/products";
import { CATEGORIES } from "../../data/catalogue/categories";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { ArrowLeft, Save } from "lucide-react";

export const EditProductPage: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const navigate = useNavigate();
  const product = sku ? getProductBySku(sku) : undefined;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.categoryId);
      setSubcategory(product.subcategory);
      setBrand(product.brand);
      setShortDesc(product.shortDescription);
      setDesc(product.description);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main-content">
          <div className="admin-body">
            <h2>Product SKU Not Found</h2>
            <Link to="/admin/products" className="btn btn-primary" style={{ marginTop: "16px" }}>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Product ${sku} updated successfully.`);
      navigate("/admin/products");
    }, 600);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title={`Edit Product: ${sku}`}
          subtitle={`Modifying ${product.name}`}
          action={
            <Link to="/admin/products" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} />
              <span>Cancel</span>
            </Link>
          }
        />

        <div className="admin-body">
          <form className="checkout-form-card" onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
            <div className="form-grid-2">
              <Input
                label="Product Name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="SKU Code"
                type="text"
                disabled
                value={sku}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.id} – {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Subcategory"
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>

            <Input
              label="Brand / Manufacturer"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <Input
              label="Short Description"
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />

            <div className="form-group">
              <label className="form-label">Full Clinical Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              leftIcon={<Save size={16} />}
            >
              Update Product Record
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
