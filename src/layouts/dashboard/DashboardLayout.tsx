import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import { useSettingsContext } from '../../components/settings';
//
import Header from './header';
import Main from './Main';
import NavHorizontal from './nav/NavHorizontal';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import Footer from './footer';
import { HEADER } from 'src/config';
import NavCartPanel from './nav/NavCartPanel';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';
  const [openCart, setOpenCart] = useState(false);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);
  const renderCart = <NavCartPanel openNavCart={openCart} onCloseNavCart={handleCloseCart} />;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  if (isNavHorizontal) {
    return (
      <>
        <Header
          onOpenNav={handleOpen}
          onClose={handleClose}
          open={open}
          onOpenCart={handleOpenCart}
        />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main>{children || <Outlet />}</Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header
          onOpenNav={handleOpen}
          onClose={handleClose}
          open={open}
          onOpenCart={handleOpenCart}
        />

        <Box
          sx={{
            display: { lg: 'flex' },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}
          <Main>{children || <Outlet />}</Main>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <Box>
      <Header
        onOpenNav={handleOpen}
        onClose={handleClose}
        open={open}
        onOpenCart={handleOpenCart}
      />

      <Box
        sx={{
          display: { lg: 'flex' },
        }}
      >
        {renderNavVertical}
        <Main sx={{ px: 0, pt: `${isDesktop ? HEADER.H_DASHBOARD_DESKTOP : HEADER.H_MOBILE}px` }}>
          {children || <Outlet />}
        </Main>
      </Box>
      {renderCart}
      <Footer />
    </Box>
  );
}
