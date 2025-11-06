import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Body from './Body';
import ProductList from './ProductList';
import ContactForm, { ContactFormType } from 'src/components/contact-form/ContactForm';
import { useAllProductsQuery } from 'src/api/productRepository';
import { useSnackbar } from 'src/components/snackbar';
import { useContactMutation } from 'src/api/contactMessagesRepository';

function HomePage() {
  const { data: products } = useAllProductsQuery();
  const { enqueueSnackbar } = useSnackbar();
  const contactMutation = useContactMutation();

  const handleContactSubmit = (values: ContactFormType) => {
    contactMutation.mutate(values, {
      onSuccess: (result) => {
        enqueueSnackbar(result.message, { variant: result.variant });
      },
      onError: (result) => {
        enqueueSnackbar(result.message, { variant: result.variant });
      },
    });
  };

  return (
    <>
      <Helmet>
        <title> Home | {APP_NAME}</title>
      </Helmet>
      <Body />
      <ProductList products={products} />
      <ContactForm onSubmit={handleContactSubmit} isSubmitting={contactMutation.isPending} />
    </>
  );
}

export default HomePage;
