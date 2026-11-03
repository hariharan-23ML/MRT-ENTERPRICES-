import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { CATEGORIES } from "../../data/catalogue/categories";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { ArrowLeft, Save } from "lucide-react";

export const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [moq, setMoq] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Product ${name} (${sku}) created and queued for manufacturer verification.`);
      navigate("/admin/products");
    }, 600);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title="Add New Medical Product"
          subtitle="Register an institutional equipment SKU to the MRT MediSource database."
          action={
            <Link to="/admin/products" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} />
              <span>Back to Products</span>
            </Link>
          }
        />

        <div className="admin-body">
          <form className="checkout-form-card" onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
            <div className="form-grid-2">
              <Input
                label="Product Name"
                type="text"
                placeholder="High-Frequency Digital C-Arm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="SKU Code"
                type="text"
                placeholder="MED-IMG-009"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  Category <span className="required">*</span>
                </label>
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
                placeholder="Fluoroscopy Systems"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>

            <div className="form-grid-2">
              <Input
                label="Manufacturer / Brand"
                type="text"
                placeholder="Illustrative Precision"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <Input
                label="Minimum Order Quantity (MOQ)"
                type="text"
                value={moq}
                onChange={(e) => setMoq(e.target.value)}
              />
            </div>

            <Input
              label="Short Description"
              type="text"
              placeholder="Concise summary for catalogue card preview"
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />

            <div className="form-group">
              <label className="form-label">Full Clinical Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Comprehensive technical equipment description..."
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
              Save Product Record
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
