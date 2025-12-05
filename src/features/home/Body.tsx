import { Box, Container, Grid } from '@mui/material';
import catalogoImagen from '../../assets/catalogImage.jpeg';
import {
  AboutUs,
  ShippingInfo,
  HomeDelivery,
  Promise,
  ComingSoon,
  PaymentMethods,
} from './Sections';
import { useTranslation } from 'react-i18next';

function Body() {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          height: '700px',
          width: '100%',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${catalogoImagen})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center 65%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Box
          component="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            borderBottom: '4px solid #fff',
            pb: 2,
          }}
        >
          {t('homePage.title')}
        </Box>
      </Box>

      <Container sx={{ pt: 8, pb: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AboutUs />
          </Grid>
          <Grid item xs={12} md={6}>
            <ShippingInfo />
          </Grid>
          <Grid item xs={12} md={6}>
            <PaymentMethods />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Body;
