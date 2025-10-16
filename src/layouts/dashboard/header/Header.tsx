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
  Toolbar,
  Typography,
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
import { useLocation, useNavigate } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { LOGO, HEADER } from 'src/config';
import { Category } from 'src/models/Category';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';
// ----------------------------------------------------------------------

type Props = {
  onOpenNav: VoidFunction;
  onClose: VoidFunction;
  open: boolean;
  onOpenCart: VoidFunction;
};

export default function Header({ onOpenNav, onClose, open, onOpenCart }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { themeLayout } = useSettingsContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: categories } = useAllCategoriesQuery();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelectCategory = (id: number) => {
    navigate(PATHS.exploreProducts.byCategory(id));
    setAnchorEl(null);
  };

  const isCartPage = pathname === PATHS.cart.root;

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
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {categories?.map((category: Category) => (
                    <MenuItem key={category.id} onClick={() => handleSelectCategory(category.id)}>
                      <Typography color="inherit" sx={{ textTransform: 'uppercase' }}>
                        {category.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
                <Button
                  color="inherit"
                  component={Link}
                  to={PATHS.wholesale.root}
                  sx={{ textTransform: 'none' }}
                >
                  Lista Mayorista
                </Button>
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
            {!isCartPage && (
              <IconButton color="inherit" onClick={onOpenCart}>
                <Iconify
                  icon="material-symbols:shopping-cart"
                  color="white"
                  width={32}
                  height={32}
                />
              </IconButton>
            )}
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
