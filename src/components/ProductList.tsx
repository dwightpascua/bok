import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/cart";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, isAuthenticated } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) {
          throw error;
        }

        if (data) {
          // Add mock variants based on product type
          const productsWithVariants = data.map(product => ({
            ...product,
            variants: getProductVariants(product.name.toLowerCase())
          }));
          setProducts(productsWithVariants);
        }
        
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductVariants = (productName: string) => {
    const variants = [];
    
    // Add RAM variant for laptops
    variants.push({
      id: 'ram',
      name: 'RAM',
      options: ['8GB', '16GB', '32GB']
    });

    // Add Storage variant
    variants.push({
      id: 'storage',
      name: 'Storage',
      options: ['256GB SSD', '512GB SSD', '1TB SSD']
    });

    // Add Processor variant
    variants.push({
      id: 'processor',
      name: 'Processor',
      options: ['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 7', 'AMD Ryzen 9']
    });

    return variants;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={addToCart}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ 
  product, 
  onAddToCart,
  isAuthenticated
}: { 
  product: Product; 
  onAddToCart: (product: Product, quantity: number, selectedVariants?: { [key: string]: string }) => Promise<void>;
  isAuthenticated: boolean;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Get all available product images
  const getProductImages = () => {
    const images = [];
    
    if (product.image_url) images.push(product.image_url);
    if (product.image_url_2) images.push(product.image_url_2);
    if (product.image_url_3) images.push(product.image_url_3);
    if (product.image_url_4) images.push(product.image_url_4);
    if (product.image_url_5) images.push(product.image_url_5);
    
    if (images.length === 0) {
      return ['https://images.unsplash.com/photo-1558002038-bb4237b9074f?q=80&w=1000'];
    }
    
    return images;
  };

  const images = getProductImages();

  const handleAddToCart = () => {
    // Only add to cart if all variants are selected
    if (product.variants && product.variants.length > 0) {
      const allVariantsSelected = product.variants.every(
        variant => selectedVariants[variant.id]
      );
      if (!allVariantsSelected) {
        return;
      }
    }
    onAddToCart(product, quantity, selectedVariants);
    setQuantity(1);
    setSelectedVariants({});
  };

  const handleVariantChange = (variantId: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: value
    }));
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative overflow-hidden bg-muted">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square relative">
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
      <CardContent className="flex-grow p-3 sm:p-4">
        <h3 className="font-medium text-sm sm:text-base">{product.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="font-bold mt-2 text-sm sm:text-base">${product.price.toFixed(2)}</div>
        
        {product.variants && product.variants.map(variant => (
          <div key={variant.id} className="mt-2">
            <Select
              value={selectedVariants[variant.id]}
              onValueChange={(value) => handleVariantChange(variant.id, value)}
            >
              <SelectTrigger className="w-full h-8 text-xs sm:text-sm">
                <SelectValue placeholder={`Select ${variant.name}`} />
              </SelectTrigger>
              <SelectContent>
                {variant.options.map(option => (
                  <SelectItem key={option} value={option} className="text-xs sm:text-sm">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center border rounded">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost"
                onClick={decrementQuantity}
                className="h-7 w-7 sm:h-8 sm:w-8"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <span className="w-6 sm:w-8 text-center text-sm">{quantity}</span>
              <Button 
                type="button" 
                size="icon" 
                variant="ghost"
                onClick={incrementQuantity}
                className="h-7 w-7 sm:h-8 sm:w-8"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            className="w-full h-8 sm:h-10 text-xs sm:text-sm"
            onClick={handleAddToCart}
            disabled={!isAuthenticated || (product.variants && product.variants.length > 0 && !product.variants.every(variant => selectedVariants[variant.id]))}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Add to Cart
          </Button>
          
          {!isAuthenticated && (
            <p className="text-xs text-muted-foreground text-center">
              Please sign in to add items to your cart
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductList;