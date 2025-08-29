import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Header from './Header';
import Body from './Body';
import ProductList from './ProductList';
import Footer from './Footer';
import { productsData } from 'src/utils/mock_products';

function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | {APP_NAME}</title>
      </Helmet>

      <Header />
      <Body />
      <ProductList products={productsData} />
      <Footer />
    </>
  );
}

export default HomePage;
