import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/routes/paths';
import formatCurrency from 'src/utils/formatCurrency';

interface CartSummaryProps {
  cartProducts: any[];
  totalAmount: number;
  fromNav?: boolean;
}

const CartSummary = ({ cartProducts, totalAmount, fromNav }: CartSummaryProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (fromNav) {
      navigate(PATHS.cart.root);
    } else {
      console.log('checkout');
    }
  };

  return (
    <Card sx={{ position: 'sticky', top: 20 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Resumen de compra
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Productos ({cartProducts.length})</Typography>
          <Typography>{formatCurrency(totalAmount)}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1 }}>Envío:</Typography>
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
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(totalAmount)}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleButtonClick}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {fromNav ? 'Continuar compra' : 'Finalizar compra'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
