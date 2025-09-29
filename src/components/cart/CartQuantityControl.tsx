import { Box, IconButton, Typography, Button, Badge, IconButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from 'src/components/cart/CartContext';
import { useSnackbar } from 'src/components/snackbar';
import { Product } from 'src/models/Product';

interface CartQuantityControlProps extends IconButtonProps {
  product: Product;
  quantity?: number;
  onUpdateQuantity?: (productId: number, newQuantity: number) => void;
  onRemoveFromCart?: (productId: number) => void;
}

export default function CartQuantityControl({
  product,
  quantity: propQuantity,
  onUpdateQuantity,
  onRemoveFromCart,
  ...rest
}: CartQuantityControlProps) {
  const { addToCart, updateQuantity: contextUpdateQuantity, removeFromCart, cart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const cartItem = product ? cart.find((item) => item.product.id === product.id) : undefined;
  const quantity = propQuantity !== undefined ? propQuantity : cartItem ? cartItem.quantity : 0;

  const handleRemove = () => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      onRemoveFromCart ? onRemoveFromCart(product.id) : removeFromCart(product.id);
      enqueueSnackbar({
        message: 'Se eliminó el producto del carrito',
        variant: 'info',
      });
    } else {
      if (onUpdateQuantity) onUpdateQuantity(product.id, newQuantity);
      else contextUpdateQuantity(product.id, newQuantity);
    }
    enqueueSnackbar({
      message: 'Se eliminó 1 unidad del producto',
      variant: 'info',
    });
  };

  const handleAdd = () => {
    const newQuantity = (quantity || 0) + 1;
    if (product) {
      if (onUpdateQuantity) {
        onUpdateQuantity(product.id, newQuantity);
      } else {
        addToCart({ product, quantity: 1 });
        enqueueSnackbar({
          message: 'Producto agregado al carrito',
          variant: 'info',
        });
      }
    } else {
      if (onUpdateQuantity) onUpdateQuantity(0, newQuantity);
      else contextUpdateQuantity(0, newQuantity);
      enqueueSnackbar({
        message: 'Producto agregado al carrito',
        variant: 'info',
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {quantity === 0 && product ? (
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            bgcolor: 'secondary.main',
            '&:hover': { bgcolor: 'secondary.dark' },
          }}
        >
          <Badge badgeContent={quantity} color="info">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}
