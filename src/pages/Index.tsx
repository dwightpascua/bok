import React from "react";
import ProductList from "@/components/ProductList";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Laptops</h1>
        <ProductList />
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2025 Click & Carry. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
