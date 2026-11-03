import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ProductFilters } from "../products/ProductFilters";
import { ProductSort } from "../products/ProductSort";
import { ProductGrid } from "../products/ProductGrid";
import { ProductList } from "../products/ProductList";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Loader } from "../common/Loader";
import { EmptyState } from "../common/EmptyState";

export const FeaturedProducts: React.FC = () => {
  const {
    filteredProducts,
    loading,
    filters,
    updateFilters,
    clearFilters,
  } = useProducts();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Derive unique subcategories from filtered products or categories
  const subcategories = Array.from(
    new Set(filteredProducts.map((p) => p.subcategory).filter(Boolean))
  );

  return (
    <section className="home-catalogue-section" aria-labelledby="catalogue-heading">
      <div className="container">
        <div className="catalogue-layout">
          {/* Left: Filter Sidebar */}
          <div className={mobileFilterOpen ? "filters-sidebar mobile-open" : ""}>
            <ProductFilters
              filters={filters}
              onUpdateFilters={updateFilters}
              onClearFilters={clearFilters}
              availableSubcategories={subcategories}
              totalResults={filteredProducts.length}
            />
          </div>

          {/* Right: Product Listing Section */}
          <div className="products-listing-wrapper">
            {/* Listing Top Bar */}
            <div className="listing-top-bar">
              <div className="listing-title-area">
                <h2 id="catalogue-heading" className="listing-main-heading">
                  All Products
                </h2>
                <span className="listing-count-badge">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </span>
              </div>

              <div className="listing-controls">
                {/* Mobile Filter Toggle */}
                <button
                  className="btn btn-outline btn-sm mobile-filter-btn"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  style={{ display: "none" }}
                >
                  <SlidersHorizontal size={14} />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <ProductSort
                  currentSort={filters.sortBy}
                  onSortChange={(sortBy) => updateFilters({ sortBy })}
                />

                {/* Grid / List View Toggle */}
                <div className="view-toggle-group">
                  <button
                    className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Container */}
            {loading ? (
              <Loader size="large" text="Loading medical equipment catalogue..." />
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                title="No Products Found"
                description="No medical products matched your active filter criteria. Try clearing some filters or searching for a different keyword."
                action={
                  <button className="btn btn-primary btn-sm" onClick={clearFilters}>
                    Reset Filters
                  </button>
                }
              />
            ) : viewMode === "grid" ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <ProductList products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
