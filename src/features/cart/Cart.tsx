import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { productsData } from 'src/utils/mock_products';
import ShoppingCart from 'src/components/shoppingCart/ShoppingCart';
import CartSummary from 'src/components/cartSummary/CartSummary';

const Cart = () => {
  const cartProducts = [
    { product: productsData[0], quantity: 1 },
    { product: productsData[1], quantity: 2 },
    { product: productsData[2], quantity: 3 },
  ];

  const totalAmount = cartProducts.reduce(
    (total, item) => total + item.product.original_price * item.quantity,
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

          {cartProducts.map((item, index) => (
            <Card key={index} sx={{ mb: 2, p: 2 }}>
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
                    onClick={() => {}}
                  >
                    Eliminar
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ${item.product.original_price.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: 'grey.200',
                      '&:hover': { bgcolor: 'grey.300' },
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: 'grey.200',
                      '&:hover': { bgcolor: 'grey.300' },
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
        </Grid>

        {/* resumen */}
        <Grid item xs={12} md={4}>
          <CartSummary cartProducts={cartProducts} totalAmount={totalAmount} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
