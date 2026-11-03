import React from "react";
import { Search, X } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  value,
  onChange,
  placeholder = "Search by model, SKU or keyword...",
}) => {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
      <Search
        size={16}
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--navy-400)",
        }}
      />
      <input
        type="text"
        className="form-input"
        style={{ paddingLeft: "36px", paddingRight: value ? "32px" : "12px", height: "38px" }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--navy-400)",
            padding: "2px",
          }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
