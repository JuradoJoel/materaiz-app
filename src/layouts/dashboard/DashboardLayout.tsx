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

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

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
        <Header onOpenNav={handleOpen} onClose={handleClose} open={open} />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main>{children || <Outlet />}</Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} onClose={handleClose} open={open} />

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
      <Header onOpenNav={handleOpen} onClose={handleClose} open={open} />

      <Box
        sx={{
          display: { lg: 'flex' },
        }}
      >
        {renderNavVertical}
        <Main>{children || <Outlet />}</Main>
      </Box>
      <Footer />
    </Box>
  );
}
