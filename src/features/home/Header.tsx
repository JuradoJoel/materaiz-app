import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';
import logo from 'src/assets/logoMate.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            backgroundColor: 'neutral.darker',
            backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            height: '125px',
            backgroundPosition: 'center',
            borderBottom: 2,
            borderColor: 'neutral.dark',
          }}
        />
        <Box>
          <AppBar position="static" sx={{ backgroundColor: 'neutral.darker' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box>
                <Button color="inherit">{t('homePage.navBar1')}</Button>
                <Button color="inherit">{t('homePage.navBar2')}</Button>
              </Box>
              <Box>
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <IconButton color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </>
  );
}

export default Header;
