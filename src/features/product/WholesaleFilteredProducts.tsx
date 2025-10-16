import { Helmet } from 'react-helmet-async';
import { Box, Container, Divider, Typography } from '@mui/material';
import { APP_NAME } from 'src/config';
import ProductList from 'src/features/home/ProductList';
import { useParams } from 'react-router-dom';
import { mockWholesaleCategories } from 'src/utils/mock_wholesale_categories';
import { wholesaleData } from 'src/utils/mock_wholesale';

function WholesaleFilteredProducts() {
  const { id } = useParams<{ id: string }>();

  let products = wholesaleData;
  let category;

  if (id) {
    category = mockWholesaleCategories.find((c) => c.id === Number(id));
    products = wholesaleData.filter((product) =>
      product.categories.some((c) => c.id === Number(id))
    );
  }

  //const category = mockWholesaleCategories.find((category) => category.id === Number(id));

  /* const products = wholesaleData.filter((product) =>
    product.categories.some((category) => category.id === Number(id))
  ); */

  const hasProducts = products.length > 0;

  return (
    <>
      <Helmet>
        <title> Mayoristas | {APP_NAME}</title>
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
              No hay productos para mostrar
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}

export default WholesaleFilteredProducts;
