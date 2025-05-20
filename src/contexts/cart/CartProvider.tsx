
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { CartContextType, CartItem } from "./types";
import { useAuthState } from "./useAuthState";
import { 
  fetchCartItems, 
  addItemToCart, 
  removeItemFromCart, 
  updateItemQuantity, 
  clearAllCartItems,
  calculateTotals 
} from "./cartUtils";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuthState();

  // Fetch cart items when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshCartItems();
    } else {
      setCartItems([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Listen for auth state changes to refresh cart
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        refreshCartItems();
      }, 0);
    }
  }, [user]);

  const refreshCartItems = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const items = await fetchCartItems(user.id);
    setCartItems(items);
    setIsLoading(false);
  };

  const addToCart = async (product: Product, quantity = 1) => {
    if (!user) {
      return;
    }

    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.product_id === product.id);
    
    if (existingItem) {
      // Update quantity of existing item
      await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      return;
    }

    // Add new item to cart
    const success = await addItemToCart(user.id, product, quantity);
    if (success) {
      await refreshCartItems();
    }
  };

  const removeFromCart = async (itemId: string) => {
    const success = await removeItemFromCart(itemId);
    if (success) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      return removeFromCart(itemId);
    }

    const success = await updateItemQuantity(itemId, quantity);
    if (success) {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const success = await clearAllCartItems(user.id);
    if (success) {
      setCartItems([]);
    }
  };

  // Calculate cart totals
  const { totalItems, totalPrice } = calculateTotals(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isAuthenticated,
        user
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
