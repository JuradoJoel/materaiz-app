import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Container, Drawer, IconButton, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import Iconify from 'src/components/iconify';
import ShoppingCart from 'src/components/shoppingCart/ShoppingCart';
import CartSummary from 'src/components/cartSummary/CartSummary';
//
import { productsData } from 'src/utils/mock_products';

type Props = {
  openNavCart: boolean;
  onCloseNavCart: VoidFunction;
};

export default function NavCartPanel({ openNavCart, onCloseNavCart }: Props) {
  const cartProducts = [
    { product: productsData[0], quantity: 1 },
    { product: productsData[1], quantity: 2 },
    { product: productsData[2], quantity: 3 },
  ];
  const totalAmount = cartProducts.reduce(
    (total, item) => total + item.product.original_price * item.quantity,
    0
  );
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNavCart) {
      onCloseNavCart();
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
        <IconButton onClick={onCloseNavCart} sx={{ color: 'text.primary' }}>
          <Iconify icon="material-symbols:close" />
        </IconButton>
      </Stack>
      <Container>
        {cartProducts.map((item, index) => (
          <ShoppingCart key={index} item={item} />
        ))}
        <CartSummary cartProducts={cartProducts} totalAmount={totalAmount} />
      </Container>
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
        anchor={isDesktop ? 'right' : 'top'}
        open={openNavCart}
        onClose={onCloseNavCart}
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
