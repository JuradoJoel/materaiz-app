import { Helmet } from 'react-helmet-async';
import { Box, Container, Divider, Typography } from '@mui/material';
import { APP_NAME } from 'src/config';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import { mockCategories } from 'src/utils/mock_categories';
import { productsData } from 'src/utils/mock_products';

function FilteredProducts() {
  const { id } = useParams<{ id: string }>();

  const category = mockCategories.find((category) => category.id === Number(id));
  const products = productsData.filter((product) =>
    product.categories.some((category) => category.id === Number(id))
  );

  const hasProducts = products.length > 0;
  return (
    <>
      <Helmet>
        <title> Categorías | {APP_NAME}</title>
      </Helmet>

      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" sx={{ textTransform: 'uppercase', marginTop: 2 }}>
            {category?.name}
          </Typography>
          <Divider sx={{ width: '100%', height: '1px', backgroundColor: 'neutral.light' }} />
          {hasProducts ? (
            <ProductList products={products} />
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
              No hay productos en esta categoría
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FilteredProducts;
