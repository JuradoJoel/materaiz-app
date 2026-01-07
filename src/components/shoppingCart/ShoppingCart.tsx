import { Box, Grid, Typography } from '@mui/material';
import formatCurrency from 'src/utils/formatCurrency';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';
import { CartItem } from 'src/models/Product';
import { useCart } from 'src/components/cart/CartContext';
import { getBombillaText, getItemUnitPrice } from 'src/utils/cartUtils';

interface ShoppingCartProps {
  item: CartItem;
  compact?: boolean;
}

const ShoppingCart = ({ item, compact = false }: ShoppingCartProps) => {
  const { removeFromCart } = useCart();
  return (
    <Box
      sx={{
        px: compact ? 1.5 : 0,
        py: compact ? 0.5 : 0,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={compact ? 2 : 2} md={compact ? 1.5 : 1.5} lg={compact ? 2.5 : 1.5}>
          <img
            src={item.product.images[0].image_url}
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

        <Grid
          item
          xs={9}
          sm={compact ? 9.5 : 10}
          md={compact ? 10 : 10.5}
          lg={compact ? 9.5 : 10.5}
        >
          <Box>
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

            {item.addons && item.addons.length > 0 && (
              <Box sx={{ mt: 1, ml: 0 }}>
                {getBombillaText(item)?.map((line, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    color="success.main"
                    sx={{
                      fontStyle: 'italic',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      display: 'block',
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
          <Typography
            color="error"
            variant="body2"
            sx={{ cursor: 'pointer', mb: 1 }}
            onClick={() => item.product.id && removeFromCart(item.product.id)}
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
                product={item.product}
                quantity={item.quantity}
                size="small"
                sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(getItemUnitPrice(item))}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
