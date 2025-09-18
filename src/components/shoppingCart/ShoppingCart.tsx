import { Box, Grid, Typography } from '@mui/material';
import { CartItem } from 'src/components/product/types';
import formatCurrency from 'src/utils/formatCurrency';
import AddToCartButton from 'src/components/cart-buttons/AddToCartButton';
import RemoveFromCartButton from 'src/components/cart-buttons/RemoveFromCartButton';

interface ShoppingCartProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const ShoppingCart = ({ item, onUpdateQuantity, onRemoveFromCart }: ShoppingCartProps) => (
  <Box>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <img
          src={item.product.image}
          alt={item.product.name}
          style={{
            width: '100%',
            maxWidth: 80,
            maxHeight: 80,
            aspectRatio: 1,
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            mb: 1,
            textTransform: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.product.name}
        </Typography>
        <Typography
          color="error"
          variant="body2"
          sx={{ cursor: 'pointer', mb: 1 }}
          onClick={() => onRemoveFromCart(item.product.id)}
        >
          Eliminar
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RemoveFromCartButton
              productId={item.product.id}
              quantity={item.quantity}
              size="small"
              sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
            />
            <Typography sx={{ minWidth: 15, textAlign: 'center' }}>{item.quantity}</Typography>
            <AddToCartButton
              productId={item.product.id}
              quantity={item.quantity}
              size="small"
              sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
              onAdd={onUpdateQuantity}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(item.product.original_price)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default ShoppingCart;
