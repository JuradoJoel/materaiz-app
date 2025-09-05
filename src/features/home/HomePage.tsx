import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Body from './Body';
import ProductList from './ProductList';
import { productsData } from 'src/utils/mock_products';
import ContactForm from 'src/components/contact-form/ContactForm';

function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | {APP_NAME}</title>
      </Helmet>
      <Body />
      <ProductList products={productsData} />
      <ContactForm />
    </>
  );
}

export default HomePage;
