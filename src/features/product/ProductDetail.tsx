import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useOneProductQuery } from 'src/api/productRepository';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';
import MateAddonsSection from 'src/components/product/MateAddonsSection';
import CustomDesignSection from 'src/components/product/CustomDesignSection';
import formatCurrency from 'src/utils/formatCurrency';
import { formatText } from 'src/utils/formatText';
import { isMateProduct } from 'src/utils/filterProductUtils';

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
                {formatText(product.name)}
              </Typography>
              {product.discount_price && product.discount_price > 0 ? (
                <>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ textDecoration: 'line-through', color: 'neutral.main' }}
                  >
                    {formatCurrency(product.original_price)}
                  </Typography>

                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'error.main', fontWeight: 'bold' }}
                  >
                    {formatCurrency(product.discount_price)}
                  </Typography>
                </>
              ) : (
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(product.original_price)}
                </Typography>
              )}

              <Typography
                variant="body1"
                paragraph
                component="div"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <CartQuantityControl product={product} sx={{ mt: 2, bgcolor: 'grey.300' }} />

              {isMateProduct(product) && <MateAddonsSection product={product} />}
              {isMateProduct(product) && <CustomDesignSection product={product} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
