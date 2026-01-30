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
  is_custom_design: boolean;
}

//tipo para la bombilla que el usuario quiera agregarle
export type BombillaOption = 'pico-curva' | 'caño-redondo';
export type SelectedBombilla = BombillaOption | null;

export interface BombillaAddon {
  type: 'bombilla';
  variant: BombillaOption;
  price: number;
  details?: string;
}

export interface CustomDesignAddon {
  type: 'custom_design';
  variant?: null;
  price: number;
  details: string | null;
}

export type Addon = BombillaAddon | CustomDesignAddon;

export interface CartItem {
  product: Product;
  quantity: number;
  addons?: Addon[];
}

export type Cart = CartItem[];
