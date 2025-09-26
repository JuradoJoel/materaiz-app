import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useOneProductQuery } from 'src/api/productRepository';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';
import { useCart } from 'src/components/cart/CartContext';
import { useSnackbar } from 'src/components/snackbar';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useOneProductQuery(Number(id));
  const { addToCart, cart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  if (!id || isNaN(Number(id))) {
    return <Typography>ID de producto inválido</Typography>;
  } else if (!product) {
    return <Typography>Producto no encontrado</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <Zoom>
              <CardMedia
                component="img"
                image={product.images[0].image_url}
                alt={product.name}
                sx={{ cursor: 'zoom-in' }}
              />
            </Zoom>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                {product.original_price}
              </Typography>
              <Typography variant="body1" paragraph>
                Descripción del producto
              </Typography>
              {quantity === 0 ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => addToCart({ product, quantity: 1 })}
                >
                  Añadir al carrito
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <CartQuantityControl
                    productId={product.id}
                    quantity={quantity}
                    product={quantity === 0 ? product : undefined}
                    sx={{ bgcolor: 'grey.300' }}
                    onQuantityChange={(newQuantity, action) => {
                      if (action === 'remove') {
                        enqueueSnackbar({
                          message:
                            newQuantity <= 0
                              ? 'Se eliminó el producto del carrito'
                              : `Se eliminó 1 unidad del producto`,
                          variant: 'info',
                        });
                      } else if (action === 'add') {
                        enqueueSnackbar({
                          message: 'Producto agregado al carrito',
                          variant: 'info',
                        });
                      }
                    }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
