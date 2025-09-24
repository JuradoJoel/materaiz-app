import { Box, Grid, Typography } from '@mui/material';
import { CartItem } from 'src/components/product/types';
import formatCurrency from 'src/utils/formatCurrency';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';

interface ShoppingCartProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  compact?: boolean;
}

const ShoppingCart = ({
  item,
  onUpdateQuantity,
  onRemoveFromCart,
  compact = false,
}: ShoppingCartProps) => (
  <Box
    sx={{
      px: compact ? 1.5 : 0,
      py: compact ? 0.5 : 0,
    }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3} sm={compact ? 2 : 2} md={compact ? 1.5 : 1.5} lg={compact ? 2.5 : 1.5}>
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

      <Grid item xs={9} sm={compact ? 9.5 : 10} md={compact ? 10 : 10.5} lg={compact ? 9.5 : 10.5}>
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
            <CartQuantityControl
              productId={item.product.id}
              quantity={item.quantity}
              size="small"
              sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveFromCart={onRemoveFromCart}
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
