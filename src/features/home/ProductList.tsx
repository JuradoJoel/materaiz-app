import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import { Product } from 'src/components/product/types';
import { productsData } from 'src/data/productsData';

interface ProductListProps {
  category?: string;
}
const categoryTranslations: { [key: string]: string } = {
  kit: 'homePage.categoryKit',
  combo: 'homePage.categoryCombo',
  termo: 'homePage.categoryTermo',
  mate: 'homePage.categoryMate',
};

function ProductList({ category }: ProductListProps) {
  const { t } = useTranslation();
  const filteredProducts = category
    ? productsData.filter((product) => product.category === category)
    : productsData;

  const productsByCategory = filteredProducts.reduce(
    (acc: { [key: string]: Product[] }, product) => {
      (acc[product.category] = acc[product.category] || []).push(product);
      return acc;
    },
    {}
  );

  return (
    <Container>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: 'neutral.light',
          mb: 2,
        }}
      />
      {category ? (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <Typography>No se encontraron productos</Typography>
        )
      ) : (
        Object.entries(productsByCategory).map(([cat, products]) => (
          <Box key={cat} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 2 }}>
              {t(categoryTranslations[cat] || cat)}
            </Typography>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        ))
      )}
    </Container>
  );
}

export default ProductList;
