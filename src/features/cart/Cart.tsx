import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { productsData } from 'src/utils/mock_products';
import { CloseIcon } from 'src/theme/overrides/CustomIcons';

const Cart = () => {
  const cartProducts = [
    { product: productsData[0], quantity: 1 },
    { product: productsData[1], quantity: 2 },
    { product: productsData[2], quantity: 3 },
  ];

  const totalAmount = cartProducts.reduce(
    (total, item) => total + item.product.original_price * item.quantity,
    0
  );

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h6" gutterBottom>
        Carrito
      </Typography>
      {/* Alerta hardcodeada */}
      <Typography color="error" sx={{ mb: 2 }}>
        El mínimo de compra es de $20.000 para finalizar tu pedido. El total de tu pedido actual es
        de ${totalAmount}.
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProducts.map((item, index) => {
            const subtotal = item.product.original_price * item.quantity;
            return (
              <TableRow
                key={index}
                sx={{
                  '& td': {
                    borderBottom: '1px solid #e0e0e0',
                  },
                }}
              >
                <TableCell align="right">
                  <IconButton
                    sx={{
                      bgcolor: 'error.lighter',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'error.light',
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: 50, marginRight: 10 }}
                    />
                    <Typography sx={{ textTransform: 'uppercase' }}>{item.product.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">${item.product.original_price}</TableCell>
                <TableCell align="right">
                  <IconButton sx={{ bgcolor: 'grey.300', margin: 1 }}>
                    <RemoveIcon />
                  </IconButton>
                  {item.quantity}
                  <IconButton sx={{ bgcolor: 'grey.300', margin: 1 }}>
                    <AddIcon />
                  </IconButton>
                </TableCell>

                <TableCell align="right">${subtotal.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary">
          Actualizar carrito
        </Button>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'right', width: '50%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                <Typography variant="h6">Totales del carrito</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                '& td': {
                  borderBottom: '1px solid #e0e0e0',
                },
              }}
            >
              <TableCell>Subtotal</TableCell>
              <TableCell align="right">${totalAmount}</TableCell>
              <TableCell colSpan={2} />
            </TableRow>
            <TableRow
              sx={{
                '& td': {
                  borderBottom: '1px solid #e0e0e0',
                },
              }}
            >
              <TableCell>Envío</TableCell>
              <TableCell colSpan={3} align="left">
                <RadioGroup name="shipping" defaultValue="pickup">
                  <FormControlLabel
                    value="pickup"
                    control={<Radio />}
                    label="Vía Cargo a sucursal cercana"
                  />
                  <FormControlLabel
                    value="delivery"
                    control={<Radio />}
                    label="Correo Argentino a domicilio"
                  />
                  <FormControlLabel value="store" control={<Radio />} label="Retiro por local" />
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '& td': {
                  borderBottom: '1px solid #e0e0e0',
                },
              }}
            >
              <TableCell>Total</TableCell>
              <TableCell align="right">${totalAmount}</TableCell>
              <TableCell colSpan={2} align="right">
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Finalizar compra
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Cart;
