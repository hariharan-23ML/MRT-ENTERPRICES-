import React from "react";
import { getSpecsBySku } from "../../data/catalogue/technicalSpecs";
import { AlertCircle } from "lucide-react";

interface ProductSpecificationsProps {
  sku: string;
  fallbackSpecs?: Record<string, string>;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  sku,
  fallbackSpecs = {},
}) => {
  const linkedSpecs = getSpecsBySku(sku);

  return (
    <div className="specs-table-wrapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 16px",
          backgroundColor: "#fffbeb",
          border: "1px solid #fde68a",
          borderRadius: "var(--radius-md)",
          fontSize: "0.8125rem",
          color: "#92400e",
          marginBottom: "20px",
        }}
      >
        <AlertCircle size={16} flex-shrink={0} />
        <span>
          <strong>Illustrative Planning Data:</strong> All technical specifications must be confirmed against the actual manufacturer datasheet and instructions for use (IFU) before clinical deployment.
        </span>
      </div>

      <table className="specs-table" aria-label="Technical specifications table">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Specification Parameter</th>
            <th style={{ width: "40%" }}>Illustrative Value</th>
            <th style={{ width: "30%" }}>Verification Status</th>
          </tr>
        </thead>
        <tbody>
          {linkedSpecs.length > 0 ? (
            linkedSpecs.map((spec, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600, color: "var(--navy-900)" }}>{spec.specification}</td>
                <td>{spec.value}</td>
                <td>
                  <span className="spec-verification-tag">
                    {spec.verificationStatus || "Manufacturer confirmation required"}
                  </span>
                </td>
              </tr>
            ))
          ) : Object.keys(fallbackSpecs).length > 0 ? (
            Object.entries(fallbackSpecs).map(([key, val], idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600, color: "var(--navy-900)" }}>{key}</td>
                <td>{val}</td>
                <td>
                  <span className="spec-verification-tag">Manufacturer confirmation required</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "var(--navy-500)", padding: "24px" }}>
                Technical datasheet pending manufacturer submission.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
