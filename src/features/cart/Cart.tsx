import { Box, Card, Grid, Typography } from '@mui/material';
import ShoppingCart from 'src/components/shoppingCart/ShoppingCart';
import CartSummary from 'src/components/cartSummary/CartSummary';
import { useCart } from 'src/components/cart/CartContext';
import formatCurrency from 'src/utils/formatCurrency';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';
import { CartItem } from 'src/models/Product';
import { useState } from 'react';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutResponse } from 'src/api/OrderRepository';
import { useSnackbar } from 'src/components/snackbar';
import { calculateCartTotal, getItemUnitPrice, getFormattedAddons } from 'src/utils/cartUtils';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isHomeDelivery, setIsHomeDelivery] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const totalAmount = calculateCartTotal(cart);
  console.log('Total calculado en Cart.tsx:', totalAmount);

  const [finalTotal, setFinalTotal] = useState(totalAmount);
  const [shippingCostFromAPI, setShippingCostFromAPI] = useState(0);
  const handleCheckoutSuccess = (_result: CheckoutResponse) => {
    enqueueSnackbar({
      message: '¡Compra confirmada!',
      variant: 'success',
    });
    cart.forEach((item) => removeFromCart(item.product.id));
    setShowCheckoutForm(false);
  };

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
            cart.map((item: CartItem) => (
              <Card key={item.product.id} sx={{ mb: 2, p: 2 }}>
                {/* mobile */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <ShoppingCart item={item} />
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
                    src={item.product.images[0].image_url}
                    alt={item.product.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 10,
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Box>
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

                      {item.addons &&
                        item.addons.length > 0 &&
                        (() => {
                          const bombillaLines = getFormattedAddons(item);
                          return bombillaLines ? (
                            <Box sx={{ mt: 0.5 }}>
                              {bombillaLines.map((line, index) => (
                                <Typography
                                  key={index}
                                  variant="body2"
                                  color="success.main"
                                  sx={{
                                    fontStyle: 'italic',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                  }}
                                >
                                  {line}
                                </Typography>
                              ))}
                            </Box>
                          ) : null;
                        })()}
                    </Box>
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
                      {formatCurrency(getItemUnitPrice(item))}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CartQuantityControl
                      product={item.product}
                      quantity={item.quantity}
                      size="small"
                      sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
                    />
                  </Box>
                </Box>
              </Card>
            ))
          )}
        </Grid>

        {/* resumen */}
        <Grid item xs={12} md={4}>
          <CartSummary
            cartProducts={cart}
            totalAmount={totalAmount}
            showCheckoutForm={showCheckoutForm}
            onCheckout={() => setShowCheckoutForm(true)}
            isHomeDelivery={isHomeDelivery}
            onIsHomeDeliveryChange={(newValue: boolean) => {
              setIsHomeDelivery(newValue);
              setShowCheckoutForm(false);
            }}
            onTotalChange={(total, shipping) => {
              setFinalTotal(total);
              setShippingCostFromAPI(shipping);
            }}
          />
        </Grid>

        {/* Formulario de checkout */}
        {showCheckoutForm && (
          <Card sx={{ mt: 3, p: 3, maxWidth: 'sm' }}>
            <Typography variant="h6" gutterBottom>
              Completa tus datos para finalizar la compra
            </Typography>

            <CheckoutForm
              cart={cart}
              totalAmount={finalTotal}
              shippingCost={shippingCostFromAPI}
              isHomeDelivery={isHomeDelivery}
              onSuccess={handleCheckoutSuccess}
              onCancel={() => setShowCheckoutForm(false)}
              onResetCheckout={() => setShowCheckoutForm(false)}
            />
          </Card>
        )}
      </Grid>
    </Box>
  );
};

export default Cart;
