import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useOneProductQuery } from 'src/api/productRepository';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';
import formatCurrency from 'src/utils/formatCurrency';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useOneProductQuery(Number(id));

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
                {formatCurrency(product.original_price)}
              </Typography>
              <Typography variant="body1" paragraph>
                Descripción del producto
              </Typography>
              <CartQuantityControl product={product} sx={{ mt: 2, bgcolor: 'grey.300' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
