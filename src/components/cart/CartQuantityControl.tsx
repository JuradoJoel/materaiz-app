import { Box, IconButton, Typography, IconButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from 'src/components/cart/CartContext';
import { Product } from 'src/models/Product';

interface CartQuantityControlProps extends IconButtonProps {
  productId: number;
  product?: Product;
  quantity?: number;
  onUpdateQuantity?: (productId: number, newQuantity: number) => void;
  onRemoveFromCart?: (productId: number) => void;
  onQuantityChange?: (newQuantity: number, action: 'add' | 'remove') => void;
}

export default function CartQuantityControl({
  productId,
  product,
  quantity = 0,
  onUpdateQuantity,
  onRemoveFromCart,
  onQuantityChange,
  ...rest
}: CartQuantityControlProps) {
  const { addToCart, updateQuantity: contextUpdateQuantity, removeFromCart } = useCart();

  const handleRemove = () => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      onRemoveFromCart ? onRemoveFromCart(productId) : removeFromCart(productId);
      if (onQuantityChange) onQuantityChange(0, 'remove');
    } else {
      if (onUpdateQuantity) onUpdateQuantity(productId, newQuantity);
      else contextUpdateQuantity(productId, newQuantity);
      if (onQuantityChange) onQuantityChange(newQuantity, 'remove');
    }
  };

  const handleAdd = () => {
    const newQuantity = (quantity || 0) + 1;
    if (onUpdateQuantity) {
      onUpdateQuantity(productId, newQuantity);
    } else if (product) {
      addToCart({ product, quantity: 1 });
    } else {
      contextUpdateQuantity(productId, newQuantity);
    }
    if (onQuantityChange) onQuantityChange(newQuantity, 'add');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={handleRemove}
        disabled={quantity === 0}
        size={rest.size || 'small'}
        sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' }, ...rest.sx }}
      >
        <RemoveIcon fontSize={rest.size || 'small'} />
      </IconButton>
      <Typography sx={{ minWidth: 20, textAlign: 'center' }}>{quantity || 0}</Typography>
      <IconButton
        onClick={handleAdd}
        size={rest.size || 'small'}
        sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' }, ...rest.sx }}
      >
        <AddIcon fontSize={rest.size || 'small'} />
      </IconButton>
    </Box>
  );
}
