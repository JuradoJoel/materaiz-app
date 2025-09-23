import { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { Cart, CartItem } from 'src/components/product/types';

interface CartContextType {
  cart: Cart;
  addToCart: (newItem: CartItem) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
