import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import formatCurrency from 'src/utils/formatCurrency';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/routes/paths';
import CartQuantityControl from 'src/components/cart/CartQuantityControl';
import { Product } from 'src/models/Product';
import { formatText } from 'src/utils/formatText';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      key={product.id}
      sx={{
        display: { xs: 'block', sm: 'block' },
        alignItems: 'center',
        p: 1,
        mb: 1,
        borderBottom: '1px solid #eee',
      }}
    >
      <Grid container spacing={1} sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            image={product.images[0].image_url}
            alt={product.name}
            sx={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={9}>
          <Typography
            variant="body1"
            onClick={() => navigate(PATHS.exploreProducts.byProduct(product.id))}
            sx={{ textDecoration: 'none', color: 'common.black', cursor: 'pointer' }}
          >
            {formatText(product.name)}
          </Typography>
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ textDecoration: 'line-through', color: 'neutral.main', mr: 1 }}
            >
              {formatCurrency(product.original_price)}
            </Box>
            <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {formatCurrency(product.discount_price || 0)}
            </Box>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <CartQuantityControl product={product} sx={{ bgcolor: 'grey.300' }} />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={product.images[0].image_url}
          alt={product.name}
          sx={{ width: '80px', height: '80px', mr: 2 }}
        />
        <CardContent sx={{ flexGrow: 1, p: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            noWrap
            onClick={() => navigate(PATHS.exploreProducts.byProduct(product.id))}
            sx={{ textDecoration: 'none', color: 'common.black', cursor: 'pointer' }}
          >
            {formatText(product.name)}
          </Typography>
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ textDecoration: 'line-through', color: 'neutral.main', marginRight: 1 }}
            >
              {formatCurrency(product.original_price)}
            </Box>
            <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {formatCurrency(product.discount_price || 0)}
            </Box>
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          <CartQuantityControl
            product={product}
            sx={{ bgcolor: 'grey.300', mt: { xs: 1, sm: 0 } }}
          />
        </Box>
        {/* <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            bgcolor: 'secondary.main',
            '&:hover': { bgcolor: 'secondary.dark' },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <Badge badgeContent={quantity} color="info">
            <ShoppingCartIcon />
          </Badge>
        </Button> */}
      </Box>
    </Card>
  );
}

export default ProductCard;
