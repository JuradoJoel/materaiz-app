import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import { productsData } from 'src/utils/mock_products';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const product = productsData[0]; //momentáneamente hardcodeado sólo para mostrar la página del producto

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <Zoom>
              <CardMedia
                component="img"
                image={product.image}
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
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Añadir al carrito
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <IconButton
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  sx={{ bgcolor: 'grey.300' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6" sx={{ mx: 2 }}>
                  {quantity}
                </Typography>
                <IconButton onClick={handleIncrease} sx={{ bgcolor: 'grey.300' }}>
                  <AddIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
