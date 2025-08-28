export interface Product {
  id: number;
  name: string;
  original_price: number;
  discount_price: number;
  image: string;
  category: 'mate' | 'termo' | 'combo' | 'kit';
}
