
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-8">
            Your order has been received and is now being processed. You will receive an order confirmation email shortly.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2025 ShopCart. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;
