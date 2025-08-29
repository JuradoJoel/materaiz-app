import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Drawer, IconButton, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
//
import Iconify from 'src/components/iconify';
import { NavContent } from './NavContent';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 'calc(100vh - 100px)',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          backgroundColor: 'transparent',
        }}
      >
        <Logo />
        {!isDesktop ? (
          <IconButton
            onClick={() => (openNav ? onCloseNav() : null)}
            sx={{ color: 'text.primary' }}
          >
            <Iconify icon={openNav ? 'material-symbols:close' : 'eva:menu-fill'} />
          </IconButton>
        ) : null}
      </Stack>
      <Box mt={2}>
        <NavContent onClose={onCloseNav} />
      </Box>
      {/*<NavDocs />*/}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
      }}
    >
      <Drawer
        anchor={isDesktop ? 'left' : 'top'}
        open={openNav}
        onClose={onCloseNav}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: isDesktop ? NAV.W_DASHBOARD : '100%',
            height: '100%',
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
