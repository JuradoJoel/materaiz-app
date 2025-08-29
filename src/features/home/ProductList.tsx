import { Box, Container } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from 'src/components/product/types';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <Container>
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
