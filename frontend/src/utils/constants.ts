export const BUSINESS_INFO = {
  name: "MRT Enterprises",
  brand: "MRT-ENTERPRICES-",
  portalName: "MediSource",
  tagline: "HEALTHCARE WHOLESALE",
  phone: "1800-890-0000",
  email: "support@medisource.mrt",
  address: "MRT Healthcare Logistics Hub, Industrial Corridor, Chennai, India",
  hours: "Monday - Saturday: 9:00 AM - 7:00 PM IST",
};

export const ANNOUNCEMENT_MESSAGES = [
  "Bulk Orders & Special Pricing",
  "Genuine Product Information",
  "Dedicated Business Support",
];

export const SORT_OPTIONS = [
  { value: "name-asc", label: "Product Name A–Z" },
  { value: "name-desc", label: "Product Name Z–A" },
  { value: "sku-asc", label: "SKU (Ascending)" },
  { value: "category-asc", label: "Category" },
];

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";
