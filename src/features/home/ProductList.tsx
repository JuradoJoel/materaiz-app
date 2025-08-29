import { Box, Container } from '@mui/material';
import ProductCard from './ProductCard';
import { productsData } from 'src/utils/mock_products';

function ProductList() {
  return (
    <Container>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: 'neutral.light',
          mb: 2,
        }}
      />

      {productsData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
}

export default ProductList;
