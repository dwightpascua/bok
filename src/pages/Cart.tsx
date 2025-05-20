import React from "react";
import { useCart } from "@/contexts/cart";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { 
    cartItems, 
    isLoading, 
    removeFromCart, 
    updateQuantity, 
    totalPrice,
    isAuthenticated,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

const handleCheckout = () => {
  clearCart();
  navigate("/thank-you");
};

  

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some items to your cart to see them here.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center border-b py-4 gap-4"
            >
              <div className="w-full sm:w-20 h-20 bg-muted flex-shrink-0">
                {item.product?.image_url ? (
                  <img 
                    src={item.product.image_url} 
                    alt={item.product?.name} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium">{item.product?.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  ${(item.product?.price || 0).toFixed(2)}
                </p>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <div className="flex items-center border rounded">
                  <Button 
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button 
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="mt-6">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-background border p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span>
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full mt-6" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
 
