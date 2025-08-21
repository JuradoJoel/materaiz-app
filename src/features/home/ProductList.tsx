import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  name: string;
  originalPrice: string;
  discountedPrice: string;
  image: string;
}

function ProductList() {
  const { t } = useTranslation();

  const products: Product[] = [
    {
      id: 1,
      name: 'Kit Viajero (ROSA) bolso matero + yerb + azuc + mate + bombilla',
      originalPrice: '$17.000',
      discountedPrice: '$12.950',
      image: 'test/rosa-kit.jpg',
    },
    {
      id: 2,
      name: 'COMBO: "IMPERIAL GUARDA ALPACA" + canasta ECO + chaulita + bombilla chata',
      originalPrice: '$35.000',
      discountedPrice: '$24.459',
      image: 'test/alpaca-combo.jpg',
    },
    {
      id: 3,
      name: 'MEGA OFERTA COMBO AL COSTO: "CAMIONERO ALGARROBO" + BOMBILLA CHATA + CANASTA ECO + YERB + AZUC',
      originalPrice: '$20.000',
      discountedPrice: '$15.789',
      image: 'test/algarrobo-combo.jpg',
    },
    {
      id: 4,
      name: 'MOCHILA/BOLSO MATERO NEGRO + TERMO ACERO MM + IMPERIAL "GUARDA ACERO" + YERB + AZUC + BOMB CHATA',
      originalPrice: '$55.000',
      discountedPrice: '$28.992',
      image: 'test/mochila-negro.jpg',
    },
    {
      id: 5,
      name: 'CANASTA MATERA NEGRA ECO + TERMO ACERO MM + IMPERIAL "GUARDA ACERO" + YERB + AZUC + BOMB CHATA',
      originalPrice: '$55.000',
      discountedPrice: '$28.992',
      image: 'test/canasta-negra.jpg',
    },
    {
      id: 6,
      name: 'KIT VIAJERO NEGRO bolso matero clásico + yerb + azuc + mate térmico vasito + bombilla chata',
      originalPrice: '$16.000',
      discountedPrice: '$11.990',
      image: 'test/negro-kit.jpg',
    },
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ textTransform: 'uppercase', mb: 2 }}>
        {t('homePage.promo')}
      </Typography>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: 'neutral.light',
          mb: 2,
        }}
      />
      {products.map((product) => (
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
          <CardContent sx={{ flexGrow: 1, p: 0 }}>
            <Typography variant="body1">{product.name}</Typography>
            <Typography variant="body2">
              <Box
                component="span"
                sx={{ textDecoration: 'line-through', color: 'neutral.main', marginRight: 1 }}
              >
                {product.originalPrice}
              </Box>
              <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                {product.discountedPrice}
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
      ))}
    </Container>
  );
}

export default ProductList;
