import React, { useState } from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import logo from 'src/assets/logoMate.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function Header() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <Button component={Link} to="/home" color="inherit">
                  {t('homePage.navBar1')}
                </Button>
                <Button color="inherit">{t('homePage.navBar2')}</Button>
                <Button
                  color="inherit"
                  onClick={handleClick}
                  endIcon={<Icon icon="solar:alt-arrow-down-linear" width="18" height="18" />}
                >
                  {t('homePage.categories')}
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>
                    <Link to="/category/kit" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {t('homePage.categoryKit')}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/category/combo" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {t('homePage.categoryCombo')}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/category/termo" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {t('homePage.categoryTermo')}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/category/mate" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {t('homePage.categoryMate')}
                    </Link>
                  </MenuItem>
                </Menu>
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
