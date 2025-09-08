import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
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
            image={product.image}
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
            {product.name}
          </Typography>
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ textDecoration: 'line-through', color: 'neutral.main', mr: 1 }}
            >
              {formatCurrency(product.original_price)}
            </Box>
            <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {formatCurrency(product.discount_price)}
            </Box>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ bgcolor: 'grey.300' }}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 1 }}>1</Typography>
            <IconButton sx={{ bgcolor: 'grey.300' }}>
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              onClick={() => navigate(PATHS.cart.root)}
              sx={{
                bgcolor: 'secondary.main',
                '&:hover': { bgcolor: 'secondary.dark' },
                ml: 'auto',
              }}
            >
              <ShoppingCartIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={product.image}
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
          onClick={() => navigate(PATHS.cart.root)}
          sx={{
            bgcolor: 'secondary.main',
            '&:hover': { bgcolor: 'secondary.dark' },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <ShoppingCartIcon />
        </Button>
      </Box>
    </Card>
  );
}

export default ProductCard;
