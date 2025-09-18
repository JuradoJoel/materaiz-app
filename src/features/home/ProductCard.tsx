import { Badge, Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Product } from 'src/components/product/types';
import { useSnackbar } from 'src/components/snackbar';
import formatCurrency from 'src/utils/formatCurrency';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/routes/paths';
import { useCart } from 'src/features/product/CartContext';
import AddToCartButton from 'src/components/cart-buttons/AddToCartButton';
import RemoveFromCartButton from 'src/components/cart-buttons/RemoveFromCartButton';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      addToCart({ product, quantity: 1 });
      enqueueSnackbar({ message: 'Producto agregado al carrito', variant: 'info' });
    } else {
      updateQuantity(product.id, quantity + 1);
    }
    navigate(PATHS.cart.root);
  };

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
            <RemoveFromCartButton
              productId={product.id}
              quantity={quantity}
              sx={{ bgcolor: 'grey.300' }}
              disabled={quantity === 0}
            />
            <Typography sx={{ mx: 1 }}>{quantity}</Typography>
            <AddToCartButton
              productId={product.id}
              quantity={quantity}
              sx={{ bgcolor: 'grey.300' }}
            />
            <Button
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                bgcolor: 'secondary.main',
                '&:hover': { bgcolor: 'secondary.dark' },
                ml: 'auto',
              }}
            >
              <Badge badgeContent={quantity} color="info">
                <ShoppingCartIcon />
              </Badge>
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
          <RemoveFromCartButton
            productId={product.id}
            quantity={quantity}
            sx={{ bgcolor: 'grey.300' }}
            disabled={quantity === 0}
          />
          <Typography sx={{ mx: 1 }}>{quantity}</Typography>
          <AddToCartButton
            productId={product.id}
            quantity={quantity}
            sx={{ bgcolor: 'grey.300' }}
          />
        </Box>
        <Button
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
        </Button>
      </Box>
    </Card>
  );
}

export default ProductCard;
