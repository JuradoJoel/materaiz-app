import { Box, Container, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FOOTER } from 'src/config';

import amexLogo from '../../../assets/payments/amex@2x.png';
import argencardLogo from '../../../assets/payments/argencard@2x.png';
import banelcoLogo from '../../../assets/payments/banelco@2x.png';
import cabalLogo from '../../../assets/payments/cabal@2x.png';
import cabaldebitLogo from '../../../assets/payments/cabaldebit@2x.png';
import cencosudLogo from '../../../assets/payments/cencosud@2x.png';
import dinersLogo from '../../../assets/payments/diners@2x.png';
import linkLogo from '../../../assets/payments/link@2x.png';
import maestroLogo from '../../../assets/payments/maestro@2x.png';
import mastercardLogo from '../../../assets/payments/mastercard@2x.png';
import nativaLogo from '../../../assets/payments/nativa@2x.png';
import pagofacilLogo from '../../../assets/payments/pagofacil@2x.png';
import provincianetLogo from '../../../assets/payments/provincianet@2x.png';
import rapipagoLogo from '../../../assets/payments/rapipago@2x.png';
import tarjetaNaranjaLogo from '../../../assets/payments/tarjeta-naranja@2x.png';
import tarjetaShoppingLogo from '../../../assets/payments/tarjeta-shopping@2x.png';
import visaLogo from '../../../assets/payments/visa@2x.png';
import visadebitLogo from '../../../assets/payments/visadebit@2x.png';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      bgcolor="neutral.darker"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      rowGap={4}
      py={8}
      minHeight={FOOTER.FOOTER_HEIGHT}
    >
      <Container>
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Link href="/policies-terms" sx={{ textDecoration: 'none', color: 'info.dark' }}>
            {t('homePage.policiesAndTerms')}
          </Link>
          <Link href="/privacy-policy" sx={{ textDecoration: 'none', color: 'info.dark' }}>
            {t('homePage.privacyPolicy')}
          </Link>
        </Box> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <List>
            <ListItem sx={{ color: 'white' }}>CONTACTÁNOS</ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to="https://wa.me/+541161832176"
                target="_blank"
                rel="noopener noreferrer"
              >
                +54 9 11 6183-2176
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to="mailto:materaiz1120@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                materaiz1120@gmail.com
              </Link>
            </ListItem>
          </List>
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
          {t('homePage.copyright')} |{' '}
          <span style={{ color: 'var(--mui-palette-info-lighter)' }}>
            {t('homePage.designAndDevelop')}
          </span>
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          mt={2}
        >
          <Box sx={{ width: 40, height: 25 }}>
            <img src={amexLogo} alt="amex" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={argencardLogo} alt="argencard" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={banelcoLogo} alt="banelco" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={cabalLogo} alt="cabal" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={cabaldebitLogo} alt="cabaldebit" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={cencosudLogo} alt="cencosud" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={dinersLogo} alt="diners" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={linkLogo} alt="link" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={maestroLogo} alt="maestro" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={mastercardLogo} alt="mastercard" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={nativaLogo} alt="nativa" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={pagofacilLogo} alt="pagofacil" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={provincianetLogo} alt="provincianet" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={rapipagoLogo} alt="rapipago" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={tarjetaNaranjaLogo} alt="tarjeta-naranja" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={tarjetaShoppingLogo} alt="tarjeta-shopping" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={visaLogo} alt="visa" />
          </Box>
          <Box sx={{ width: 40, height: 25 }}>
            <img src={visadebitLogo} alt="visadebit" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
