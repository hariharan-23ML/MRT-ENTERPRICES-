import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductFilters } from "../components/products/ProductFilters";
import { ProductSort } from "../components/products/ProductSort";
import { ProductGrid } from "../components/products/ProductGrid";
import { ProductList } from "../components/products/ProductList";
import { LayoutGrid, List } from "lucide-react";
import { Loader } from "../components/common/Loader";
import { EmptyState } from "../components/common/EmptyState";
import { CategorySection } from "../components/home/CategorySection";

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const {
    filteredProducts,
    loading,
    filters,
    updateFilters,
    clearFilters,
  } = useProducts();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (initialSearch) {
      updateFilters({ search: initialSearch });
    }
    if (initialCategory) {
      updateFilters({ categories: [initialCategory] });
    }
  }, [initialSearch, initialCategory]);

  const subcategories = Array.from(
    new Set(filteredProducts.map((p) => p.subcategory).filter(Boolean))
  );

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "64px" }}>
      {/* Category Strip */}
      <CategorySection activeCategoryId={filters.categories[0]} />

      <div className="container" style={{ marginTop: "16px" }}>
        <div className="catalogue-layout">
          {/* Left: Filter Sidebar */}
          <ProductFilters
            filters={filters}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
            availableSubcategories={subcategories}
            totalResults={filteredProducts.length}
          />

          {/* Right: Product Listing */}
          <div className="products-listing-wrapper">
            <div className="listing-top-bar">
              <div className="listing-title-area">
                <h1 className="listing-main-heading">Medical Equipment Catalogue</h1>
                <span className="listing-count-badge">
                  {filteredProducts.length} Products Available
                </span>
              </div>

              <div className="listing-controls">
                <ProductSort
                  currentSort={filters.sortBy}
                  onSortChange={(sortBy) => updateFilters({ sortBy })}
                />

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

            {loading ? (
              <Loader size="large" text="Loading complete product catalogue..." />
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                title="No Products Match Your Criteria"
                description="We could not find any medical equipment matching the active filters. Try adjusting your search keyword or selected categories."
                action={
                  <button className="btn btn-primary btn-sm" onClick={clearFilters}>
                    Clear All Filters
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
    </div>
  );
};
