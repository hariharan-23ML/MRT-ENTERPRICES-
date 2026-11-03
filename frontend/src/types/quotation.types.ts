export interface QuotationItem {
  productId?: string;
  sku: string;
  productName: string;
  quantity: number;
  targetPrice?: string;
}

export interface QuotationCustomerDetails {
  organizationName: string;
  facilityType: "HOSPITAL" | "CLINIC" | "DIAGNOSTIC_LAB" | "DISTRIBUTOR" | "OTHER";
  contactPerson: string;
  email: string;
  phone: string;
  deliveryCity: string;
  deliveryState: string;
  pincode: string;
  gstNumber?: string;
}

export interface QuotationRequest {
  id?: string;
  quotationNumber?: string;
  customerDetails: QuotationCustomerDetails;
  products: QuotationItem[];
  deliveryLocation: string;
  expectedDeliveryDate?: string;
  additionalRequirements?: string;
  urgencyLevel: "STANDARD" | "EXPEDITED" | "CRITICAL";
  status?: "SUBMITTED" | "UNDER_REVIEW" | "QUOTED" | "ACCEPTED" | "DECLINED";
  createdAt?: string;
}
