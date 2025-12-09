import { Helmet } from 'react-helmet-async';
import { Box, Container, Divider, Typography } from '@mui/material';
import { APP_NAME } from 'src/config';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';
import { useAllProductsQuery } from 'src/api/productRepository';

function FilteredProducts() {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  const { data: categories } = useAllCategoriesQuery();
  const { data: products } = useAllProductsQuery();

  const category = categories?.find((cat) => cat.id === categoryId);
  const filteredProducts = products?.filter((product) =>
    product.categories?.some((c) => c.id === categoryId)
  );

  const hasProducts = filteredProducts && filteredProducts.length > 0;

  return (
    <>
      <Helmet>
        <title>Categorías | {APP_NAME}</title>
      </Helmet>

      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" sx={{ textTransform: 'uppercase', marginTop: 2 }}>
            {category?.name}
          </Typography>

          <Divider sx={{ width: '100%', height: '1px', backgroundColor: 'neutral.light' }} />

          {hasProducts ? (
            <ProductList products={filteredProducts} hideCategoryTitle={true} />
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
