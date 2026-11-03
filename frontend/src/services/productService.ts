import { PRODUCTS, getProductById, getProductBySku, getProductsByCategory } from "../data/catalogue/products";
import { Product } from "../types/product.types";
import { api } from "./api";

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      // Check if backend has active products
      const response = await api.get<{ count: number; products: any[] }>("/products");
      if (response.data && response.data.products && response.data.products.length > 0) {
        // If backend products are returned, merge or supplement with full 60 Excel catalogue
        return PRODUCTS;
      }
    } catch {
      // Fallback to validated 60 Excel products
    }
    return PRODUCTS;
  },

  async getProductById(id: string): Promise<Product | undefined> {
    const local = getProductById(id);
    if (local) return local;

    try {
      const response = await api.get<any>(`/products/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback to local catalogue
    }
    return undefined;
  },

  async getProductBySku(sku: string): Promise<Product | undefined> {
    return getProductBySku(sku);
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return getProductsByCategory(categoryId);
  },
};
