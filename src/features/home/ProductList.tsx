import { Container } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from 'src/models/Product';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <Container>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
}

export default ProductList;
