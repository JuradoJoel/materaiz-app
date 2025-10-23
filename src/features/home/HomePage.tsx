import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Body from './Body';
import ProductList from './ProductList';
import ContactForm from 'src/components/contact-form/ContactForm';
import { useAllProductsQuery } from 'src/api/productRepository';

function HomePage() {
  const { data: products } = useAllProductsQuery();

  return (
    <>
      <Helmet>
        <title> Home | {APP_NAME}</title>
      </Helmet>
      <Body />
      <ProductList products={products} />
      <ContactForm />
    </>
  );
}

export default HomePage;
