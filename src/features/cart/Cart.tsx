import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { productsData } from 'src/utils/mock_products';

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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Resumen de compra
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Productos ({cartProducts.length})</Typography>
                <Typography>${totalAmount.toLocaleString()}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Envío:</Typography>
                <RadioGroup name="shipping" defaultValue="pickup">
                  <FormControlLabel
                    value="pickup"
                    control={<Radio />}
                    label="Vía Cargo a sucursal cercana"
                  />
                  <FormControlLabel
                    value="delivery"
                    control={<Radio />}
                    label="Correo Argentino a domicilio"
                  />
                  <FormControlLabel value="store" control={<Radio />} label="Retiro por local" />
                </RadioGroup>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ${totalAmount.toLocaleString()}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                }}
              >
                Finalizar compra
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
