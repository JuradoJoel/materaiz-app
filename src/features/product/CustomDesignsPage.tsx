import { Box, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import { useAllProductsQuery } from 'src/api/productRepository';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';
import ProductList from 'src/features/home/ProductList';
import { LoadingSpinner } from 'src/components/loading-spinner';

export default function CustomDesignsPage() {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const { data: categories = [] } = useAllCategoriesQuery();

  const customDesignProducts = products?.filter((p) => p.is_custom_design === true) ?? [];
  const hasProducts = customDesignProducts.length > 0;

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

        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              my: 8,
            }}
          >
            <LoadingSpinner />
            <Typography sx={{ textAlign: 'center', mt: 2 }}>Cargando productos...</Typography>
          </Box>
        )}

        {isError && (
          <Typography color="error" align="center" sx={{ my: 8 }}>
            Error al cargar los productos. Por favor, intentá recargar la página.
          </Typography>
        )}

        {!isLoading && !isError && hasProducts && (
          <ProductList products={customDesignProducts} categoryMap={categoryMap} />
        )}

        {!isLoading && !isError && !hasProducts && (
          <Typography sx={{ textAlign: 'center', fontWeight: 700, my: 8 }}>
            No hay diseños personalizados disponibles.
          </Typography>
        )}
      </Container>
    </>
  );
}
