import { Box, Container, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FOOTER } from 'src/config';

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
      height={FOOTER.FOOTER_HEIGHT}
    >
      <Container>
        <Box
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
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
          {t('homePage.copyright')} |{' '}
          <Link
            href="https://google.com"
            target="_blank"
            rel="noopener"
            sx={{ textDecoration: 'none', color: 'info.lighter' }}
          >
            {t('homePage.designAndDevelop')}
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
