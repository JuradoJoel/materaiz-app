import { PATHS } from 'src/routes/paths';
import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/features/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CategoriesNavButton } from './components/CategoriesNavButton';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';

interface Props {
  onClose: () => void;
}

export const NavContent = ({ onClose }: Props) => {
  const { logout, isAuthenticated } = useAuthContext();
  const [giftListOpen, setGiftListOpen] = useState<boolean>(false);
  const { data: categories } = useAllCategoriesQuery();
  type NavigateItem = {
    label: string;
    icon: string;
    onClick?: () => void;
    navigateTo?: string;
    authRequired: boolean;
  };

  const secondNavigation: NavigateItem[] = [
    // {
    //   label: 'Cómo funciona',
    //   icon: 'material-symbols:format-list-numbered',
    //   navigateTo: PATHS.home.root,
    //   authRequired: false,
    // },
    // {
    //   label: 'Preguntas frecuentes',
    //   icon: 'solar:question-circle-linear',
    //   navigateTo: PATHS.home.root,
    //   authRequired: false,
    // },
    // {
    //   label: 'Soporte',
    //   icon: 'cil:speech',
    //   navigateTo: PATHS.home.root,
    //   authRequired: false,
    // },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(0);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 2,
        rowGap: 2,
      }}
    >
      <Card sx={{ width: '100%' }}>
        <List disablePadding>
          <CategoriesNavButton
            categories={categories}
            isOpen={giftListOpen}
            onClose={onClose}
            onToggle={() => setGiftListOpen(!giftListOpen)}
          />
        </List>
      </Card>
      <Card sx={{ width: '100%' }}>
        <List disablePadding>
          {secondNavigation
            .filter((item) => !item.authRequired || isAuthenticated)
            .map((item, index) => (
              <ListItemButton
                key={index}
                onClick={() =>
                  item.navigateTo ? navigate(item.navigateTo) : item.onClick && item.onClick()
                }
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Box display="flex">
                    <ListItemIcon>
                      <Iconify icon={item.icon} />
                    </ListItemIcon>
                    <ListItemText sx={{ fontSize: 14 }} primary={item.label} />
                  </Box>
                  <Iconify icon="material-symbols:chevron-right" />
                </Box>
              </ListItemButton>
            ))}
        </List>
      </Card>
      {isAuthenticated && (
        <Button
          variant="text"
          onClick={handleLogout}
          sx={{ alignSelf: 'flex-start', columnGap: 1, ml: 1, mt: 2 }}
        >
          <Iconify icon={'humbleicons:logout'} color={'error.custom'} />
          <Typography variant="body2" fontSize={14} fontWeight={500} color={'error.custom'}>
            Cerrar sesión
          </Typography>
        </Button>
      )}
    </Container>
  );
};
