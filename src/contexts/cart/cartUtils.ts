
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Product } from "@/types";
import { CartItem } from "./types";

export const fetchCartItems = async (userId: string) => {
  try {
    // Get cart items with product details using joins
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    
    // Transform the data to match our CartItem type
    const cartItems = data?.map(item => ({
      ...item,
      product: item.products
    })) || [];
    
    return cartItems;
  } catch (error: any) {
    console.error("Error fetching cart:", error.message);
    toast.error("Failed to load your cart");
    return [];
  }
};

export const addItemToCart = async (userId: string, product: Product, quantity = 1) => {
  try {
    // Ensure productId is a string
    const productId = product.id;
    
    const { error } = await supabase
      .from('cart_items')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity
      });

    if (error) {
      console.error("Error adding to cart:", error.message);
      throw error;
    }
    
    toast.success("Added to cart");
    return true;
  } catch (error: any) {
    console.error("Error adding to cart:", error.message);
    toast.error("Failed to add item to cart");
    return false;
  }
};

export const removeItemFromCart = async (itemId: string) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
    toast.success("Item removed from cart");
    return true;
  } catch (error: any) {
    console.error("Error removing from cart:", error.message);
    toast.error("Failed to remove item");
    return false;
  }
};

export const updateItemQuantity = async (itemId: string, quantity: number) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("Error updating quantity:", error.message);
    toast.error("Failed to update quantity");
    return false;
  }
};

export const clearAllCartItems = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    toast.success("Order Placed Successfully");
    return true;
  } catch (error: any) {
    console.error("Error clearing cart:", error.message);
    toast.error("Failed to clear cart");
    return false;
  }
};

export const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  
  return { totalItems, totalPrice };
};
