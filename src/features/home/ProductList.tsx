import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import { Product } from 'src/components/product/types';

function ProductList() {
  const { t } = useTranslation();

  const products: Product[] = [
    {
      id: 1,
      name: 'Kit Viajero (ROSA) bolso matero + yerb + azuc + mate + bombilla',
      original_Price: 17000,
      discount_Price: 12950,
      image: 'test/rosa-kit.jpg',
    },
    {
      id: 2,
      name: 'COMBO: "IMPERIAL GUARDA ALPACA" + canasta ECO + chaulita + bombilla chata',
      original_Price: 35000,
      discount_Price: 24459,
      image: 'test/alpaca-combo.jpg',
    },
    {
      id: 3,
      name: 'MEGA OFERTA COMBO AL COSTO: "CAMIONERO ALGARROBO" + BOMBILLA CHATA + CANASTA ECO + YERB + AZUC',
      original_Price: 20000,
      discount_Price: 15789,
      image: 'test/algarrobo-combo.jpg',
    },
    {
      id: 4,
      name: 'MOCHILA/BOLSO MATERO NEGRO + TERMO ACERO MM + IMPERIAL "GUARDA ACERO" + YERB + AZUC + BOMB CHATA',
      original_Price: 55000,
      discount_Price: 28992,
      image: 'test/mochila-negro.jpg',
    },
    {
      id: 5,
      name: 'CANASTA MATERA NEGRA ECO + TERMO ACERO MM + IMPERIAL "GUARDA ACERO" + YERB + AZUC + BOMB CHATA',
      original_Price: 55000,
      discount_Price: 28992,
      image: 'test/canasta-negra.jpg',
    },
    {
      id: 6,
      name: 'KIT VIAJERO NEGRO bolso matero clásico + yerb + azuc + mate térmico vasito + bombilla chata',
      original_Price: 16000,
      discount_Price: 11990,
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
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
}

export default ProductList;
