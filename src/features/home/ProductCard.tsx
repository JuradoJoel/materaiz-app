import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { Product } from 'src/components/product/types';
import formatCurrency from 'src/utils/formatCurrency';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'src/routes/paths';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        key={product.id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          mb: 1,
          borderBottom: '1px solid #eee',
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ width: '80px', height: '80px', mr: 2 }}
        />
        <CardContent sx={{ flexGrow: 1, p: 1 }}>
          <Typography
            variant="body1"
            onClick={() => navigate(PATHS.exploreProducts.byProduct(product.id))}
            sx={{ textDecoration: 'none', color: 'common.black', cursor: 'pointer' }}
          >
            {product.name}
          </Typography>
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ textDecoration: 'line-through', color: 'neutral.main', marginRight: 1 }}
            >
              {formatCurrency(product.original_price)}
            </Box>
            <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {formatCurrency(product.discount_price)}
            </Box>
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          <IconButton sx={{ bgcolor: 'grey.300' }}>
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 1 }}>1</Typography>
          <IconButton sx={{ bgcolor: 'grey.300' }}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
        >
          <ShoppingCartIcon />
        </Button>
      </Card>
    </>
  );
}

export default ProductCard;
