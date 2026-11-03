import { CartItem } from "./cart.types";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "QUOTED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface ShippingAddress {
  facilityName: string;
  contactPerson: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  taxIdOrGst?: string;
}

export interface Order {
  id: number | string;
  orderNumber: string;
  customer: {
    id?: number | string;
    name: string;
    email: string;
    phone?: string;
    organization?: string;
  };
  items: CartItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  totalAmount?: number | null;
  pricingType: "CONFIRMED" | "ON_REQUEST";
}
