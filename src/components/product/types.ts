import { Category } from 'src/models/Category';

export interface Product {
  id: number;
  name: string;
  original_price: number;
  discount_price: number;
  image: string;
  categories: Category[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Cart = CartItem[];
