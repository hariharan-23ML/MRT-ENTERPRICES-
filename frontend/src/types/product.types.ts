export interface ProductDocuments {
  datasheetPdf?: string;
  userManual?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  categoryName: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  brand: string;
  model: string;
  image: string;
  price: number | null;
  priceVerified: boolean;
  stockStatus: string;
  stockVerified: boolean;
  rating: number | null;
  ratingVerified: boolean;
  warranty: string;
  specifications: Record<string, string>;
  features: string[];
  documents: ProductDocuments;
  certifications?: string;
  warrantyService?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  minimumOrderQuantity: number | string;
  bulkPricing: string;
  verificationStatus: string;
  purchaseActions?: string;
}

export interface TechnicalSpecification {
  sku: string;
  productName: string;
  specification: string;
  value: string;
  verificationStatus: string;
}

export interface ProductFilterState {
  search: string;
  categories: string[];
  subcategories: string[];
  brands: string[];
  availability: string[];
  sortBy: "name-asc" | "name-desc" | "sku-asc" | "category-asc";
}
