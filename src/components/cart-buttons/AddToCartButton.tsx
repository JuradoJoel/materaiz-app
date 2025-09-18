import { IconButton, IconButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from 'src/features/product/CartContext';
import { Product } from 'src/components/product/types';

interface AddToCartButtonProps extends IconButtonProps {
  productId: number;
  product?: Product;
  quantity?: number;
  onAdd?: (productId: number, newQuantity: number) => void;
}

export default function AddToCartButton({
  productId,
  product,
  quantity,
  onAdd,
  ...rest
}: AddToCartButtonProps) {
  const { addToCart, updateQuantity } = useCart();

  const handleAdd = () => {
    if (quantity !== undefined && onAdd) {
      const newQuantity = quantity + 1;
      onAdd(productId, newQuantity);
      updateQuantity(productId, newQuantity);
    } else if (product) {
      addToCart({ product, quantity: 1 });
    } else if (quantity !== undefined) {
      updateQuantity(productId, quantity + 1);
    }
  };

  return (
    <IconButton onClick={handleAdd} {...rest}>
      <AddIcon fontSize={rest.size || 'small'} />
    </IconButton>
  );
}
