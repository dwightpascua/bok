export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  image_url_2?: string;
  image_url_3?: string;
  image_url_4?: string;
  image_url_5?: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
  selectedVariants?: { [key: string]: string };
}