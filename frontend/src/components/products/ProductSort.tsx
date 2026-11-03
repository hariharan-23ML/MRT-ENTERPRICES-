import React from "react";
import { SORT_OPTIONS } from "../../utils/constants";
import { ProductFilterState } from "../../types/product.types";

interface ProductSortProps {
  currentSort: ProductFilterState["sortBy"];
  onSortChange: (sort: ProductFilterState["sortBy"]) => void;
}

export const ProductSort: React.FC<ProductSortProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="sort-control-group">
      <label htmlFor="product-sort-select">Sort by:</label>
      <select
        id="product-sort-select"
        className="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as ProductFilterState["sortBy"])}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
