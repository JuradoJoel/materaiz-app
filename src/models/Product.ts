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

//tipo para la bombilla que el usuario quiera agregarle
export type BombillaOption = 'pico-curva' | 'caño-redondo';
export type SelectedBombilla = BombillaOption | null;

export interface CartItem {
  product: Product;
  quantity: number;
  addonBombilla?: BombillaOption;
}

export type Cart = CartItem[];
