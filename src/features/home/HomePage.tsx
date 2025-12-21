import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Body from './Body';
import ProductList from './ProductList';
import ContactForm, { ContactFormType } from 'src/components/contact-form/ContactForm';
import { useAllProductsQuery } from 'src/api/productRepository';
import { useSnackbar } from 'src/components/snackbar';
import { useContactMutation } from 'src/api/contactMessagesRepository';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';
import { LoadingSpinner } from 'src/components/loading-spinner';
import { Box, Typography } from '@mui/material';

function HomePage() {
  const { data: products = [], isLoading, isFetching } = useAllProductsQuery();
  const { enqueueSnackbar } = useSnackbar();
  const contactMutation = useContactMutation();
  const { data: categories = [] } = useAllCategoriesQuery();

  const isLoadingOrFetching = isLoading || isFetching;
  const hasProducts = products.length > 0;

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
  const categoryMap =
    categories?.reduce((acc, c) => {
      acc[c.id] = c.name;
      return acc;
    }, {} as Record<number, string>) || {};

  return (
    <>
      <Helmet>
        <title> Home | {APP_NAME}</title>
      </Helmet>
      <Body />
      {isLoadingOrFetching && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadingSpinner />
          <Typography sx={{ textAlign: 'center' }}>Cargando productos...</Typography>
        </Box>
      )}
      {!isLoadingOrFetching && hasProducts && (
        <ProductList products={products} categoryMap={categoryMap} />
      )}
      {!isLoadingOrFetching && !hasProducts && (
        <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
          No hay productos disponibles
        </Typography>
      )}
      <ContactForm onSubmit={handleContactSubmit} isSubmitting={contactMutation.isPending} />
    </>
  );
}

export default HomePage;
