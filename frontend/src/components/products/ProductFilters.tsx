import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { CATEGORIES } from "../../data/catalogue/categories";
import { ProductFilterState } from "../../types/product.types";

interface ProductFiltersProps {
  filters: ProductFilterState;
  onUpdateFilters: (newFilters: Partial<ProductFilterState>) => void;
  onClearFilters: () => void;
  availableSubcategories?: string[];
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onUpdateFilters,
  onClearFilters,
  availableSubcategories = [],
}) => {
  const handleCategoryToggle = (catId: string) => {
    const isSelected = filters.categories.includes(catId);
    const updated = isSelected
      ? filters.categories.filter((c) => c !== catId)
      : [...filters.categories, catId];
    onUpdateFilters({ categories: updated, subcategories: [] });
  };

  const handleSubcategoryToggle = (subcat: string) => {
    const isSelected = filters.subcategories.includes(subcat);
    const updated = isSelected
      ? filters.subcategories.filter((s) => s !== subcat)
      : [...filters.subcategories, subcat];
    onUpdateFilters({ subcategories: updated });
  };

  const isFiltered =
    filters.search ||
    filters.categories.length > 0 ||
    filters.subcategories.length > 0 ||
    filters.brands.length > 0;

  return (
    <aside className="filters-sidebar" aria-label="Product Catalogue Filters">
      <div className="filters-header">
        <span className="filters-title">
          <Filter size={16} />
          <span>Filters</span>
        </span>
        {isFiltered && (
          <button
            className="clear-filters-btn"
            onClick={onClearFilters}
            title="Reset all filters"
          >
            <RotateCcw size={12} style={{ display: "inline", marginRight: "3px" }} />
            Clear
          </button>
        )}
      </div>

      {/* Filter by keyword / SKU */}
      <div className="filter-section">
        <div className="filter-section-title">Search Products / SKU</div>
        <input
          type="text"
          className="filter-search-input"
          placeholder="Filter by name, SKU..."
          value={filters.search}
          onChange={(e) => onUpdateFilters({ search: e.target.value })}
        />
      </div>

      {/* Categories Filter (All 12) */}
      <div className="filter-section">
        <div className="filter-section-title">
          <span>Equipment Categories</span>
          <span style={{ fontSize: "0.6875rem", color: "var(--navy-400)" }}>
            ({CATEGORIES.length})
          </span>
        </div>
        <div className="filter-options-list">
          {CATEGORIES.map((cat) => {
            const isChecked = filters.categories.includes(cat.id);
            return (
              <label key={cat.id} className="filter-checkbox-label">
                <span className="checkbox-with-text">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat.id)}
                  />
                  <span>{cat.name}</span>
                </span>
                <span className="filter-option-count">{cat.productCount}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Dynamic Subcategories Filter if available */}
      {availableSubcategories.length > 0 && (
        <div className="filter-section">
          <div className="filter-section-title">Subcategories</div>
          <div className="filter-options-list">
            {availableSubcategories.map((subcat) => {
              const isChecked = filters.subcategories.includes(subcat);
              return (
                <label key={subcat} className="filter-checkbox-label">
                  <span className="checkbox-with-text">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      checked={isChecked}
                      onChange={() => handleSubcategoryToggle(subcat)}
                    />
                    <span>{subcat}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Availability Status */}
      <div className="filter-section">
        <div className="filter-section-title">Procurement Status</div>
        <div className="filter-options-list">
          <label className="filter-checkbox-label">
            <span className="checkbox-with-text">
              <input type="checkbox" className="filter-checkbox" defaultChecked />
              <span>Commercial Quotation Required</span>
            </span>
          </label>
          <label className="filter-checkbox-label">
            <span className="checkbox-with-text">
              <input type="checkbox" className="filter-checkbox" defaultChecked />
              <span>Availability on Request</span>
            </span>
          </label>
        </div>
      </div>
    </aside>
  );
};
