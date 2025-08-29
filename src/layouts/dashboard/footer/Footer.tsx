import { Box, Container, IconButton, Link, Typography } from '@mui/material';
import palette from 'src/theme/palette';
import WhiteLogo from 'src/assets/logo2.png';
import Iconify from 'src/components/iconify';
import { getIcon } from 'src/utils/icons';
import moment from 'moment';
import { FOOTER } from 'src/config';
import { environment } from 'src/environment/environment';

export default function Footer() {
  const theme = palette('light');
  // const { data } = useSocialMediaQuery();
  return (
    <Box component="footer" sx={{ backgroundColor: theme.background.neutral }}>
      <Container>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          rowGap={4}
          height={FOOTER.FOOTER_HEIGHT}
        >
          <img src={WhiteLogo} alt="RegalaNos" />
          <Box display="flex" flexDirection="row">
            {/* {data?.map((item) => (
              <IconButton
                key={item.id}
                sx={{ color: 'text.primary' }}
                onClick={() => window.open(item.link, '_blank')}
              >
                <Iconify icon={getIcon(item.name)} color={'common.white'} />
              </IconButton>
            ))} */}
          </Box>
          <Typography variant="body2" color={'grey.50'}>
            © {moment().year()} RegalaNos
          </Typography>
          <Box display="flex" flexDirection="row" sx={{ gap: 2 }}>
            <Link
              href={`${environment.baseURL}/TERMINOS-CONDICIONES-REGALANOS-29-4-2025.pdf`}
              target="_blank"
              variant="body2"
              color={'grey.50'}
              sx={{ textDecoration: 'underline' }}
            >
              Términos y condiciones
            </Link>
            <Link
              href={`${environment.baseURL}/POLITICAS-PRIVACIDAD.pdf`}
              target="_blank"
              variant="body2"
              color={'grey.50'}
              sx={{ textDecoration: 'underline' }}
            >
              Políticas de Privacidad
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
