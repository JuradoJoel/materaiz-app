import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Body from './Body';
import ProductList from './ProductList';
import ContactForm, { ContactFormType } from 'src/components/contact-form/ContactForm';
import { useProductsInfiniteQuery } from 'src/api/productRepository';
import { useSnackbar } from 'src/components/snackbar';
import { useContactMutation } from 'src/api/contactMessagesRepository';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';
import { LoadingSpinner } from 'src/components/loading-spinner';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function HomePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useProductsInfiniteQuery();

  const { enqueueSnackbar } = useSnackbar();
  const contactMutation = useContactMutation();
  const { data: categories = [] } = useAllCategoriesQuery();

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const categoryMap = categories.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {} as Record<number, string>);

  const allProducts = data?.pages.flatMap((page) => page) ?? [];
  const hasProducts = allProducts.length > 0;

  return (
    <>
      <Helmet>
        <title>Home | {APP_NAME}</title>
      </Helmet>

      <Body />

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

      {hasProducts && (
        <>
          <ProductList products={allProducts} categoryMap={categoryMap} />
          <Box
            ref={loadMoreRef}
            sx={{
              height: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: 4,
            }}
          >
            {isFetchingNextPage && <CircularProgress size={40} />}
            {!hasNextPage && !isFetchingNextPage && (
              <Typography variant="body1" color="text.secondary">
                ¡Has visto todos los productos!
              </Typography>
            )}
          </Box>
        </>
      )}

      {!isLoading && !hasProducts && !isError && (
        <Typography sx={{ textAlign: 'center', fontWeight: 700, my: 8 }}>
          No hay productos disponibles
        </Typography>
      )}

      <ContactForm onSubmit={handleContactSubmit} isSubmitting={contactMutation.isPending} />
    </>
  );
}

export default HomePage;
