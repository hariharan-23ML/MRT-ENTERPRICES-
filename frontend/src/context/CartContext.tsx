import React, { createContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "../types/cart.types";
import { Product } from "../types/product.types";
import { cartService } from "../services/cartService";

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (sku: string, quantity: number) => Promise<void>;
  removeFromCart: (sku: string) => Promise<void>;
  clearCart: () => void;
  loading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await cartService.getCart();
        setItems(cartItems);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = async (product: Product, quantity = 1) => {
    const updated = await cartService.addToCart(product, quantity);
    setItems([...updated]);
  };

  const updateQuantity = async (sku: string, quantity: number) => {
    const updated = await cartService.updateQuantity(sku, quantity);
    setItems([...updated]);
  };

  const removeFromCart = async (sku: string) => {
    const updated = await cartService.removeItem(sku);
    setItems([...updated]);
  };

  const clearCart = () => {
    cartService.clearCart();
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
