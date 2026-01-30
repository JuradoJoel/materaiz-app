import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import { useAllProductsQuery } from 'src/api/productRepository';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';
import ProductList from 'src/features/home/ProductList';

export default function CustomDesignsPage() {
  const { data: products } = useAllProductsQuery();
  const { data: categories = [] } = useAllCategoriesQuery();

  const customDesignProducts = products?.filter((p) => p.is_custom_design === true) ?? [];
  const categoryMap = categories.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {} as Record<number, string>);

  return (
    <>
      <Helmet>
        <title>Diseños personalizados | {APP_NAME}</title>
      </Helmet>

      <Container sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Diseños personalizados
        </Typography>

        {customDesignProducts.length > 0 ? (
          <ProductList products={customDesignProducts} categoryMap={categoryMap} />
        ) : (
          <Typography sx={{ mt: 2 }}>No hay diseños personalizados disponibles.</Typography>
        )}
      </Container>
    </>
  );
}
