import useLocalStorage from './useLocalStorage';
import { Cart, CartItem } from 'src/components/product/types';

export default function useCart() {
  const [cart, setCart] = useLocalStorage<Cart>('cart', []);

  const addToCart = (newItem: CartItem) => {
    setCart((currentCart: Cart) => {
      const existingIndex = currentCart.findIndex((item) => item.product.id === newItem.product.id);
      if (existingIndex !== -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingIndex].quantity += newItem.quantity;
        return updatedCart;
      }
      return [...currentCart, newItem];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart((currentCart: Cart) => {
      const updatedCart = currentCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      );
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart: Cart) => currentCart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart };
}
