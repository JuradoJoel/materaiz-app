import { Box, Button, Card, Container, Grid, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { productsData } from 'src/utils/mock_products';

interface Props {
  onCloseNavCart: () => void;
}

export const NavCartContent = ({ onCloseNavCart }: Props) => {
  const cartProducts = [
    { product: productsData[0], quantity: 1 },
    { product: productsData[1], quantity: 2 },
    { product: productsData[2], quantity: 3 },
  ];
  const totalAmount = cartProducts.reduce(
    (total, item) => total + item.product.original_price * item.quantity,
    0
  );
  const handleCheckout = () => {
    onCloseNavCart();
  };

  return (
    <Box mt={2} sx={{ flex: 1, px: 2.5 }}>
      {cartProducts.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                    objectFit: 'cover',
                    borderRadius: 10,
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 1,
                    pb: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: 'grey.200',
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 15, textAlign: 'center' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: 'grey.200',
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
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
                  sx={{ cursor: 'pointer', mb: 'auto' }}
                  onClick={() => {}}
                >
                  Eliminar
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'right',
                    mt: 'auto',
                  }}
                >
                  ${item.product.original_price.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      ))}
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1 }}>
          <Typography>Total a pagar:</Typography>
          <Typography>${totalAmount.toLocaleString()}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleCheckout}
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          Finalizar compra
        </Button>
      </Container>
    </Box>
  );
};
