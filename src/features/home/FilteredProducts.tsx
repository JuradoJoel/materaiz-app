import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';
import { APP_NAME } from 'src/config';
import Header from './Header';
import ProductList from './ProductList';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { mockCategories } from 'src/utils/mock_categories';

function FilteredProducts() {
  const { id } = useParams<{ id: string }>();

  const category = mockCategories.find((category) => category.id === Number(id));
  return (
    <>
      <Helmet>
        <title> Categorías | {APP_NAME}</title>
      </Helmet>

      <Header />
      <Container>
        <Typography variant="h4" sx={{ textTransform: 'uppercase', margin: 2 }}>
          {category?.name}
        </Typography>
        <ProductList />
      </Container>
      <Footer />
    </>
  );
}

export default FilteredProducts;
