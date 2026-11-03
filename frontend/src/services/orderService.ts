import { Order } from "../types/order.types";
import { api } from "./api";

const ORDERS_STORAGE_KEY = "medisource_orders";

export const orderService = {
  getLocalOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveLocalOrder(order: Order): void {
    const orders = this.getLocalOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  },

  async createOrder(orderPayload: Partial<Order>): Promise<Order> {
    const newOrder: Order = {
      id: Date.now(),
      orderNumber: `MRT-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: orderPayload.customer || {
        name: "Healthcare Buyer",
        email: "buyer@hospital.org",
      },
      items: orderPayload.items || [],
      shippingAddress: orderPayload.shippingAddress!,
      status: "PENDING",
      pricingType: "ON_REQUEST",
      createdAt: new Date().toISOString(),
      notes: orderPayload.notes,
    };

    try {
      const token = localStorage.getItem("medisource_token");
      if (token) {
        const response = await api.post<{ order: any }>("/orders", {
          shippingAddress: orderPayload.shippingAddress,
          paymentMethod: orderPayload.paymentMethod || "PURCHASE_ORDER",
        });
        if (response.data?.order) {
          return {
            ...newOrder,
            id: response.data.order.id || newOrder.id,
            orderNumber: response.data.order.orderNumber || newOrder.orderNumber,
          };
        }
      }
    } catch {
      // Offline fallback: save to localStorage
    }

    this.saveLocalOrder(newOrder);
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    try {
      const token = localStorage.getItem("medisource_token");
      if (token) {
        const response = await api.get<{ orders: any[] }>("/orders");
        if (response.data?.orders && response.data.orders.length > 0) {
          return response.data.orders;
        }
      }
    } catch {
      // Fallback to local
    }
    return this.getLocalOrders();
  },

  async getOrderById(id: string | number): Promise<Order | undefined> {
    const local = this.getLocalOrders().find((o) => String(o.id) === String(id) || o.orderNumber === id);
    if (local) return local;

    try {
      const response = await api.get<{ order: any }>(`/orders/${id}`);
      if (response.data?.order) {
        return response.data.order;
      }
    } catch {
      // Fallback
    }
    return undefined;
  },
};
