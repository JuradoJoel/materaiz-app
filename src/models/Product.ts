import { Category } from './Category';

interface ProductImage {
  id: number;
  image_url: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  original_price: number;
  discount_price: number | null;
  images: ProductImage[];
  categories: Category[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Cart = CartItem[];
