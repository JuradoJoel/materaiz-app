import { Box, Container, Typography } from '@mui/material';
import catalogoImagen from '../../assets/catalogImage.png';
import Iconify from 'src/components/iconify';

import { Trans, useTranslation } from 'react-i18next';

function Body() {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          height: '475px',
          width: '100%',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${catalogoImagen})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            position: 'relative',
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            borderBottom: '4px solid #fff',
            pb: 2,
          }}
        >
          {t('homePage.title')}
        </Typography>
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
          paddingTop: '5rem',
        }}
      >
        <Iconify icon="solar:info-circle-linear" width={40} height={40} />
        <Typography variant="h4" sx={{ textTransform: 'uppercase', margin: 1 }}>
          {t('homePage.bulkPurchase')}
        </Typography>
        <Typography paragraph sx={{ color: 'text.primary' }}>
          <Trans i18nKey="homePage.bulkPurchaseText" />
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, paddingTop: '2rem' }}>
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Iconify icon="solar:hand-money-bold" width={40} height={40} />
            <Typography variant="h4" sx={{ textTransform: 'uppercase', margin: 1 }}>
              {t('homePage.payment')}
            </Typography>
            <Typography paragraph sx={{ color: 'text.primary', flexGrow: 1 }}>
              <Trans i18nKey="homePage.paymentText" />
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Iconify icon="eva:car-outline" width={40} height={40} />
            <Typography variant="h4" sx={{ textTransform: 'uppercase', margin: 1 }}>
              {t('homePage.shipping')}
            </Typography>
            <Typography paragraph sx={{ color: 'text.primary', flexGrow: 1 }}>
              {t('homePage.shippingText')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Body;
