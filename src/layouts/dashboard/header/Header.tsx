// @mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
// components
import Iconify from '../../../components/iconify';

import { useSettingsContext } from '../../../components/settings';
//
import Searchbar from './Searchbar';
import { useNavigate } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { LOGO, HEADER } from 'src/config';
import { mockCategories } from 'src/utils/mock_categories';
import { Category } from 'src/models/Category';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------------------

type Props = {
  onOpenNav: VoidFunction;
  onClose: VoidFunction;
  open: boolean;
};

export default function Header({ onOpenNav, onClose, open }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { themeLayout } = useSettingsContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNavHorizontal = themeLayout === 'horizontal';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Avatar src={LOGO} alt="Logo" style={{ width: '100px' }} />}

      <Box sx={{ width: '100%' }}>
        {!isOffset && isDesktop && (
          <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
            <IconButton onClick={() => navigate(PATHS.home.root)} sx={{ maxWidth: '80px' }}>
              <Avatar src={LOGO} alt="Logo" style={{ width: '100%', height: '100%' }} />
            </IconButton>
          </Box>
        )}
        {!isOffset && isDesktop && (
          <Divider sx={{ width: '100%', height: '2px', backgroundColor: 'gray' }} />
        )}
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          {isDesktop && (
            <Box>
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
                  {mockCategories.map((category: Category) => (
                    <MenuItem key={category.id} onClick={handleClose}>
                      <Link
                        to={`/category/${category.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {category.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          )}
          {!isDesktop && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconButton onClick={() => navigate(PATHS.home.root)} sx={{ maxWidth: '70px' }}>
                <Avatar src={LOGO} alt="Logo" style={{ width: '100%', height: '100%' }} />
              </IconButton>
            </Box>
          )}
          {isOffset && isDesktop && (
            <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <IconButton onClick={() => navigate(PATHS.home.root)} sx={{ maxWidth: '70px' }}>
                <Avatar src={LOGO} alt="Logo" style={{ width: '100%', height: '100%' }} />
              </IconButton>
            </Box>
          )}
          <Box display="flex" justifyContent="end" alignItems="center">
            <Searchbar />
            <IconButton color="inherit">
              <Iconify icon="material-symbols:shopping-cart" color="white" width={32} height={32} />
            </IconButton>
            {!isDesktop && (
              <IconButton onClick={open ? onClose : onOpenNav} sx={{ color: 'text.primary' }}>
                <Iconify
                  icon={open ? 'material-symbols:close' : 'eva:menu-fill'}
                  color="white"
                  width={32}
                  height={32}
                />
              </IconButton>
            )}
          </Box>
        </Box>

        {/*<LanguagePopover />

        <NotificationsPopover />

      <ContactsPopover />*/}
      </Box>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.neutral.darker,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            bgcolor: 'background.default',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 3 },
          backgroundColor: !isOffset ? 'neutral.darker' : 'unset',
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
