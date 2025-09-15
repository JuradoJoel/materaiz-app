import { IconButton, IconButtonProps } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from 'src/features/product/CartContext';

interface RemoveFromCartButtonProps extends IconButtonProps {
  productId: number;
  quantity: number;
  onRemove?: (productId: number, newQuantity: number) => void;
}

export default function RemoveFromCartButton({
  productId,
  quantity,
  onRemove,
  ...rest
}: RemoveFromCartButtonProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleRemove = () => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      if (onRemove) onRemove(productId, newQuantity);
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <IconButton onClick={handleRemove} disabled={quantity <= 0} {...rest}>
      <RemoveIcon fontSize={rest.size || 'small'} />
    </IconButton>
  );
}
