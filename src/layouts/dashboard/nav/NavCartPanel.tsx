import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Container, Drawer, IconButton, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import Iconify from 'src/components/iconify';
import ShoppingCart from 'src/components/shoppingCart/ShoppingCart';
import CartSummary from 'src/components/cartSummary/CartSummary';
//
import { useCart } from 'src/components/cart/CartContext';
import { CartItem } from 'src/models/Product';

type Props = {
  openNavCart: boolean;
  onCloseNavCart: VoidFunction;
};

export default function NavCartPanel({ openNavCart, onCloseNavCart }: Props) {
  const { cart } = useCart();
  const [isHomeDelivery, setIsHomeDelivery] = useState(false);
  const totalAmount = cart.reduce(
    (total, item: CartItem) => total + item.product.original_price * item.quantity,
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
        {cart.length === 0 ? (
          <Typography sx={{ p: 2 }}>El carrito está vacío.</Typography>
        ) : (
          cart.map((item: CartItem) => <ShoppingCart key={item.product.id} item={item} compact />)
        )}
        <CartSummary
          cartProducts={cart}
          totalAmount={totalAmount}
          fromNav
          isHomeDelivery={isHomeDelivery}
          onIsHomeDeliveryChange={setIsHomeDelivery}
        />
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
            width: isDesktop ? 400 : '100%',
            height: '100%',
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
