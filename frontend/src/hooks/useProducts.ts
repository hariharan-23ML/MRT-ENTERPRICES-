import { useState, useEffect, useMemo } from "react";
import { Product, ProductFilterState } from "../types/product.types";
import { productService } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ProductFilterState>({
    search: "",
    categories: [],
    subcategories: [],
    brands: [],
    availability: [],
    sortBy: "name-asc",
  });

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        if (mounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Failed to load medical equipment catalogue.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchCategory = product.categoryName.toLowerCase().includes(query);
        const matchSubcat = product.subcategory.toLowerCase().includes(query);
        if (!matchName && !matchSku && !matchCategory && !matchSubcat) {
          return false;
        }
      }

      // Categories
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.categoryId) && !filters.categories.includes(product.categoryName)) {
          return false;
        }
      }

      // Subcategories
      if (filters.subcategories.length > 0) {
        if (!filters.subcategories.includes(product.subcategory)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (filters.sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (filters.sortBy === "sku-asc") {
        return a.sku.localeCompare(b.sku);
      }
      if (filters.sortBy === "category-asc") {
        return a.categoryName.localeCompare(b.categoryName);
      }
      return 0;
    });
  }, [products, filters]);

  const updateFilters = (newFilters: Partial<ProductFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      categories: [],
      subcategories: [],
      brands: [],
      availability: [],
      sortBy: "name-asc",
    });
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
  };
};
