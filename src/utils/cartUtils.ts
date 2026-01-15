import { CartItem, Addon, BombillaOption } from 'src/models/Product';
import { getBombillaLabel } from 'src/constants/bombillas';
import formatCurrency from 'src/utils/formatCurrency';

// precio total de addons de un item
const getAddonsTotalPrice = (addons: Addon[] = []): number =>
  addons.reduce((acc, addon) => acc + addon.price, 0);

export const calculateCartTotal = (cart: CartItem[]): number => {
  const total = cart.reduce((acc, item) => {
    const basePrice = Number(item.product.discount_price ?? item.product.original_price);
    const addonsPrice = getAddonsTotalPrice(item.addons);

    const itemTotal = basePrice * item.quantity + addonsPrice;

    return acc + itemTotal;
  }, 0);

  return Math.round(total);
};

export const getItemUnitPrice = (item: CartItem): number => {
  const basePrice = item.product.discount_price ?? item.product.original_price;
  return Math.round(basePrice);
};

export const getBombillaText = (item: CartItem): string[] | null => {
  if (!item.addons || item.addons.length === 0) return null;

  const grouped = item.addons.reduce((acc, addon) => {
    if (addon.type !== 'bombilla') return acc;

    const variant = addon.variant ?? 'desconocida';

    if (!acc[variant]) {
      acc[variant] = {
        count: 0,
        label: getBombillaLabel(variant as BombillaOption),
        price: addon.price,
      };
    }
    acc[variant].count++;
    return acc;
  }, {} as Record<string, { count: number; label: string; price: number }>);

  const lines = Object.values(grouped).map(({ count, label, price }) => {
    const countText = count > 1 ? `${count}× ` : '';
    return `+ Bombilla: ${countText}${label} (+${formatCurrency(price)})`;
  });

  return lines.length > 0 ? lines : null;
};

export const getFormattedAddons = (item: CartItem): string[] | null => {
  if (!item.addons || item.addons.length === 0) return null;

  const lines: string[] = [];
  const bombillaAddons = item.addons.filter((a) => a.type === 'bombilla');
  if (bombillaAddons.length > 0) {
    const bombillaLines = getBombillaText(item) || [];
    lines.push(...bombillaLines);
  }

  const designAddons = item.addons.filter((a) => a.type === 'custom_design');
  if (designAddons.length > 0) {
    const designCount = designAddons.length;
    const designPrice = designAddons[0]?.price || 0;
    const countText = designCount > 1 ? `${designCount}× ` : '';

    lines.push(`+ Diseño personalizado: ${countText}(+${formatCurrency(designPrice)})`);
  }

  return lines.length > 0 ? lines : null;
};
