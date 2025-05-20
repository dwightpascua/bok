import { Link } from "react-router-dom";
import { useCart } from "@/contexts/cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingCart, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const Header = () => {
  const { isAuthenticated, cartItems, totalItems } = useCart();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="bg-background border-b py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/icons/shopping-house-icon.png" 
            alt="Click & Carry" 
            className="h-20 w-auto object-contain mix-blend-darken"
          />
          <span className="text-2xl sm:text-3xl font-bold text-foreground">
            Click & Carry
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <Link to="/cart">
                <Button className={cn(buttonVariants({ variant: "outline", size: "sm" }), "relative")}>
                  <ShoppingCart className="h-4 w-4" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className={cn(buttonVariants({ size: "sm" }))}>
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
