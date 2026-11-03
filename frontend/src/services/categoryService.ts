import { CATEGORIES, getCategoryById, getCategoryByName } from "../data/catalogue/categories";
import { Category } from "../types/category.types";
import { api } from "./api";

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await api.get<{ categories: any[] }>("/categories");
      if (response.data && response.data.categories && response.data.categories.length > 0) {
        return CATEGORIES;
      }
    } catch {
      // Use local validated 12 categories
    }
    return CATEGORIES;
  },

  getCategoryById(id: string): Category | undefined {
    return getCategoryById(id);
  },

  getCategoryByName(name: string): Category | undefined {
    return getCategoryByName(name);
  },
};
