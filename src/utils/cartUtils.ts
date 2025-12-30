import { CartItem } from 'src/models/Product';
import { getBombillaLabel, getBombillaPrice } from 'src/constants/bombillas';
import formatCurrency from 'src/utils/formatCurrency';

export const calculateCartTotal = (cart: CartItem[]): number => {
  const total = cart.reduce((acc, item) => {
    const basePrice = Number(item.product.discount_price ?? item.product.original_price);
    const bombillaPrice = getBombillaPrice(item.addonBombilla ?? null);

    const itemTotal = (basePrice + bombillaPrice) * item.quantity;

    return acc + itemTotal;
  }, 0);

  return Math.round(total);
};

export const getItemUnitPrice = (item: CartItem): number => {
  const basePrice = item.product.discount_price ?? item.product.original_price;
  const bombillaPrice = getBombillaPrice(item.addonBombilla ?? null);
  return Math.round(basePrice + bombillaPrice);
};

export const getBombillaText = (item: CartItem): string | null => {
  if (!item.addonBombilla) return null;

  return `+ Bombilla: ${getBombillaLabel(item.addonBombilla)} (+${formatCurrency(
    getBombillaPrice(item.addonBombilla)
  )})`;
};
