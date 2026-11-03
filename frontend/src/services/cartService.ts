import { CartItem } from "../types/cart.types";
import { Product } from "../types/product.types";
import { api } from "./api";

const CART_STORAGE_KEY = "medisource_cart";

export const cartService = {
  getLocalCart(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveLocalCart(items: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  },

  async getCart(): Promise<CartItem[]> {
    try {
      const token = localStorage.getItem("medisource_token");
      if (token) {
        const response = await api.get<{ cart: { items: any[] } }>("/cart");
        if (response.data?.cart?.items) {
          return response.data.cart.items.map((item) => ({
            product: item.product,
            quantity: item.qty || item.quantity || 1,
          }));
        }
      }
    } catch {
      // Return local cart
    }
    return this.getLocalCart();
  },

  async addToCart(product: Product, quantity = 1): Promise<CartItem[]> {
    const current = this.getLocalCart();
    const existingIndex = current.findIndex((item) => item.product.sku === product.sku);

    if (existingIndex > -1) {
      current[existingIndex].quantity += quantity;
    } else {
      current.push({ product, quantity });
    }

    this.saveLocalCart(current);

    // Sync with backend if authenticated
    const token = localStorage.getItem("medisource_token");
    if (token) {
      try {
        await api.post("/cart", { productId: product.id, qty: quantity });
      } catch {
        // Ignored, client state kept in sync
      }
    }

    return current;
  },

  async updateQuantity(sku: string, quantity: number): Promise<CartItem[]> {
    let current = this.getLocalCart();
    if (quantity <= 0) {
      current = current.filter((item) => item.product.sku !== sku);
    } else {
      const item = current.find((i) => i.product.sku === sku);
      if (item) {
        item.quantity = quantity;
      }
    }
    this.saveLocalCart(current);
    return current;
  },

  async removeItem(sku: string): Promise<CartItem[]> {
    const current = this.getLocalCart().filter((item) => item.product.sku !== sku);
    this.saveLocalCart(current);
    return current;
  },

  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
  },
};
