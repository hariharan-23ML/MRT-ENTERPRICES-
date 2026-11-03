export interface Category {
  id: string; // e.g. "CAT-01"
  name: string; // e.g. "Patient Monitoring Equipment"
  exampleSubcategory: string;
  description: string;
  image: string;
  productCount: number;
  status: "Active" | "Inactive" | string;
}
