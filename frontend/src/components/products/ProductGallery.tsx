import React, { useState } from "react";

interface ProductGalleryProps {
  mainImage: string;
  productName: string;
  sku: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ mainImage, productName, sku }) => {
  const [activeImage, setActiveImage] = useState<string>(mainImage);

  // Gallery view with primary view and fallbacks
  const thumbnails = [
    { id: 1, src: mainImage, label: "Front Profile" },
    { id: 2, src: `/images/categories/${sku.split("-")[1]?.toLowerCase() || "patient-monitoring"}.svg`, label: "Category Vector" },
    { id: 3, src: "/images/placeholders/medical-device-placeholder.svg", label: "Instrument Schematic" },
  ];

  return (
    <div className="details-gallery">
      <div className="main-image-display">
        <img
          src={activeImage}
          alt={productName}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/placeholders/medical-device-placeholder.svg";
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {thumbnails.map((thumb) => (
          <button
            key={thumb.id}
            onClick={() => setActiveImage(thumb.src)}
            style={{
              width: "72px",
              height: "56px",
              borderRadius: "var(--radius-md)",
              border: `2px solid ${activeImage === thumb.src ? "var(--primary-600)" : "var(--navy-200)"}`,
              backgroundColor: "#f8fafc",
              padding: "4px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src={thumb.src}
              alt={thumb.label}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
