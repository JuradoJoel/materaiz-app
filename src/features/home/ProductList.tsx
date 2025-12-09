import { Box, Container, Divider, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from 'src/models/Product';

interface ProductListProps {
  products?: Product[];
  categoryMap?: Record<number, string>;
  hideCategoryTitle?: boolean;
}

function ProductList({
  products = [],
  categoryMap = {},
  hideCategoryTitle = false,
}: ProductListProps) {
  const groups = products.reduce((acc, product) => {
    const catId = product.categories?.[0]?.id;
    const key = catId ?? 0;
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {} as Record<number, Product[]>);

  return (
    <Container sx={{ py: 4 }}>
      {Object.entries(groups).map(([catId, prods]) => {
        const categoryName =
          Number(catId) === 0 ? 'Otros productos' : categoryMap?.[Number(catId)] || 'Sin categoría';

        return (
          <Box key={catId} sx={{ mb: 8 }}>
            {/* Solo muestra el título si no está siendo ocultado */}
            {!hideCategoryTitle && (
              <>
                <Typography
                  variant="h4"
                  sx={{ textTransform: 'uppercase', marginTop: 2, fontWeight: 600 }}
                >
                  {categoryName}
                </Typography>
                <Divider sx={{ my: 2, backgroundColor: 'neutral.light' }} />
              </>
            )}
            {prods.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        );
      })}
    </Container>
  );
}

export default ProductList;
