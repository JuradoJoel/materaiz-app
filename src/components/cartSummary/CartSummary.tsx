import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/routes/paths';
import formatCurrency from 'src/utils/formatCurrency';

import { useCalculateShippingMutation } from 'src/api/shippingRepository';

interface CartSummaryProps {
  cartProducts: any[];
  totalAmount: number;
  totalWeight?: number;
  fromNav?: boolean;
  onCheckout?: () => void;
  showCheckoutForm?: boolean;
  isHomeDelivery: boolean;
  onIsHomeDeliveryChange: (value: boolean) => void;
  onTotalChange?: (finalTotal: number, shippingCost: number) => void;
}

interface ShippingOption {
  service: string;
  cost: number;
  estimatedDays: string;
  currency: string;
  deliveryType: string;
}

export default function CartSummary({
  cartProducts,
  totalAmount,
  totalWeight = 0.5,
  fromNav,
  onCheckout,
  showCheckoutForm,
  isHomeDelivery,
  onIsHomeDeliveryChange,

  onTotalChange,
}: CartSummaryProps) {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [shippingError, setShippingError] = useState('');
  const mutation = useCalculateShippingMutation();

  // Costo de envío según si es domicilio
  const shippingCost = isHomeDelivery
    ? shippingOptions.find((opt) => `${opt.deliveryType}-${opt.service}` === selectedShipping)
        ?.cost || 0
    : 0;

  const finalTotal = totalAmount + shippingCost;

  useEffect(() => {
    onTotalChange?.(finalTotal, shippingCost);
  }, [finalTotal, shippingCost]);

  // Cambio método de entrega
  const handleDeliveryChange = (value: boolean) => {
    onIsHomeDeliveryChange(value);

    if (!value) {
      setPostalCode('');
      setShippingOptions([]);
      setSelectedShipping('');
      setShippingError('');
      mutation.reset();
    }
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setPostalCode(value);
    setShippingError('');

    if (value.length === 0) {
      setShippingOptions([]);
      setSelectedShipping('');
    }
  };

  const calculateShipping = () => {
    if (postalCode.length < 4) {
      setShippingError('El código postal debe tener al menos 4 dígitos');
      return;
    }

    setShippingError('');

    mutation.mutate(
      {
        destCP: postalCode,
        weight: totalWeight,
        dimensions: { length: 20, width: 15, height: 10 },
      },
      {
        onSuccess: (options) => {
          setShippingOptions(options);

          if (options.length > 0) {
            const cheapest = options[0];
            setSelectedShipping(`${cheapest.deliveryType}-${cheapest.service}`);
          }
        },
        onError: () => {
          setShippingError('No se pudo calcular el envío');
          setShippingOptions([]);
          setSelectedShipping('');
        },
      }
    );
  };

  const handleButtonClick = () => {
    if (fromNav) navigate(PATHS.cart.root);
    else onCheckout?.();
  };
  const loadingShipping = mutation.isPending;
  const hasNetworkError = mutation.isError;

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

        <Divider sx={{ my: 2 }} />

        {/* Método de entrega */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Método de entrega:</Typography>

          <RadioGroup
            name="homeDelivery"
            value={isHomeDelivery ? 'delivery' : 'pickup'}
            onChange={(e) => handleDeliveryChange(e.target.value === 'delivery')}
          >
            <FormControlLabel
              value="pickup"
              control={<Radio />}
              label="Retiro por local (Gratis)"
            />
            <FormControlLabel value="delivery" control={<Radio />} label="Envío a domicilio" />
          </RadioGroup>
        </Box>

        {/* Cálculo de envío */}
        {isHomeDelivery && (
          <Box sx={{ mb: 2, pl: 4 }}>
            <Typography sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500 }}>
              Calculá tu envío:
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                placeholder="Código Postal"
                value={postalCode}
                onChange={handlePostalCodeChange}
                inputProps={{ maxLength: 8 }}
                sx={{ flex: 1 }}
                error={!!shippingError}
              />

              <Button
                variant="outlined"
                onClick={calculateShipping}
                disabled={loadingShipping || postalCode.length < 4}
                sx={{ minWidth: '100px' }}
              >
                {loadingShipping ? <CircularProgress size={20} /> : 'Calcular'}
              </Button>
            </Box>

            {(shippingError || hasNetworkError) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {shippingError || 'Error al conectar con el servidor'}
              </Alert>
            )}

            {shippingOptions.length > 0 && (
              <>
                <Typography sx={{ mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
                  Opciones de envío disponibles:
                </Typography>

                <RadioGroup
                  value={selectedShipping}
                  onChange={(e) => setSelectedShipping(e.target.value)}
                >
                  {shippingOptions.map((option) => (
                    <FormControlLabel
                      key={`${option.deliveryType}-${option.service}`}
                      value={`${option.deliveryType}-${option.service}`}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body2">{option.service}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatCurrency(option.cost)} - Llega en {option.estimatedDays} días
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </>
            )}

            {shippingOptions.length === 0 &&
              !loadingShipping &&
              postalCode.length >= 4 &&
              !shippingError && (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No hay opciones disponibles para este código postal
                </Typography>
              )}
          </Box>
        )}

        {/* Costo envío */}
        {isHomeDelivery ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Envío</Typography>
            <Typography>{shippingCost > 0 ? formatCurrency(shippingCost) : '—'}</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Envío</Typography>
            <Typography color="success.main" sx={{ fontWeight: 500 }}>
              Gratis
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(finalTotal)}
          </Typography>
        </Box>

        {!showCheckoutForm && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleButtonClick}
            sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
          >
            Continuar compra
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
