import { Box, Card, Grid, Typography } from '@mui/material';
import ShoppingCart from 'src/components/shoppingCart/ShoppingCart';
import CartSummary from 'src/components/cartSummary/CartSummary';
import { useCart } from 'src/components/cart/CartContext';
import { CartItem } from 'src/components/product/types';
import formatCurrency from 'src/utils/formatCurrency';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';
import { useSnackbar } from 'src/components/snackbar';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const totalAmount = cart.reduce(
    (total, item: CartItem) => total + item.product.original_price * item.quantity,
    0
  );

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ ml: 1 }}>
              Carrito
            </Typography>
          </Box>

          {cart.length === 0 ? (
            <Typography>El carrito está vacío.</Typography>
          ) : (
            cart.map((item: CartItem, index: number) => (
              <Card key={item.product.id} sx={{ mb: 2, p: 2 }}>
                {/* mobile */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <ShoppingCart
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemoveFromCart={removeFromCart}
                  />
                </Box>

                {/* desktop */}
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 10,
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        mb: 1,
                        textTransform: 'none',
                      }}
                    >
                      {item.product.name}
                    </Typography>
                    <Typography
                      color="error"
                      variant="body2"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Eliminar
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(item.product.original_price)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CartQuantityControl
                      productId={item.product.id}
                      quantity={item.quantity}
                      size="small"
                      sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
                      onQuantityChange={(newQuantity, action) => {
                        if (action === 'remove') {
                          enqueueSnackbar({
                            message:
                              newQuantity <= 0
                                ? 'Se eliminó el producto del carrito'
                                : `Se eliminó 1 unidad del producto`,
                            variant: 'info',
                          });
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            ))
          )}
        </Grid>

        {/* resumen */}
        <Grid item xs={12} md={4}>
          <CartSummary cartProducts={cart} totalAmount={totalAmount} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
