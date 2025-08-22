import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0',
        backgroundColor: 'neutral.darker',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Link href="/policies-terms" sx={{ textDecoration: 'none', color: 'info.dark' }}>
          {t('homePage.policiesAndTerms')}
        </Link>
        <Link href="/privacy-policy" sx={{ textDecoration: 'none', color: 'info.dark' }}>
          {t('homePage.privacyPolicy')}
        </Link>
      </Box>
      <Typography variant="body2" color="text.secondary">
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
    </Box>
  );
}

export default Footer;
