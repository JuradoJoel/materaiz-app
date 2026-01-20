import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Collapse,
  Checkbox,
  FormControlLabel as MuiFormControlLabel,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useCart } from 'src/components/cart/CartContext';
import { Product, BombillaOption, Addon } from 'src/models/Product';
import {
  useBombillaOptions,
  useBombillaPrice,
  getBombillaLabel,
} from 'src/constants/bombillas';
import formatCurrency from 'src/utils/formatCurrency';

interface MateAddonsSectionProps {
  product: Product;
}

export default function MateAddonsSection({ product }: MateAddonsSectionProps) {
  const { cart, updateItem } = useCart();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const addons = cartItem?.addons ?? [];
  const isSyncingFromUI = useRef(false);

  // Estados
  const [defaultBombilla, setDefaultBombilla] = useState<BombillaOption | null>(null);
  const [customize, setCustomize] = useState(false);
  const [countPicoCurva, setCountPicoCurva] = useState(0);
  const [countCanoRedondo, setCountCanoRedondo] = useState(0);

  // Hooks de precios y opciones
  const bombillaOptions = useBombillaOptions();
  const picoCurvaPrice = useBombillaPrice('pico-curva');
  const cañoRedondoPrice = useBombillaPrice('caño-redondo');
  const selectedBombillaPrice = useBombillaPrice(defaultBombilla);

  // Derivado
  const picoCountFromCart = addons.filter((a) => a.variant === 'pico-curva').length;
  const canoCountFromCart = addons.filter((a) => a.variant === 'caño-redondo').length;

  const isDefaultPico = picoCountFromCart === quantity && canoCountFromCart === 0;
  const isDefaultCano = canoCountFromCart === quantity && picoCountFromCart === 0;

  const derivedDefaultBombilla: BombillaOption | null = isDefaultPico
    ? 'pico-curva'
    : isDefaultCano
    ? 'caño-redondo'
    : null;

  useEffect(() => {
    if (quantity <= 1 && customize) {
      setCustomize(false);
      setCountPicoCurva(0);
      setCountCanoRedondo(0);
    }
  }, [quantity, customize]);

  useEffect(() => {
    if (isSyncingFromUI.current) {
      isSyncingFromUI.current = false;
      return;
    }
    if (!cartItem || quantity === 0) return;

    const pico = addons.filter((a) => a.variant === 'pico-curva').length;
    const cano = addons.filter((a) => a.variant === 'caño-redondo').length;

    if (pico === quantity && cano === 0) {
      setDefaultBombilla('pico-curva');
      setCustomize(false);
      return;
    }

    if (cano === quantity && pico === 0) {
      setDefaultBombilla('caño-redondo');
      setCustomize(false);
      return;
    }

    if (pico > 0 && cano > 0) {
      setCustomize(true);
      setDefaultBombilla(null);
      setCountPicoCurva(pico);
      setCountCanoRedondo(cano);
    }
  }, [cartItem, quantity, addons]);

  useEffect(() => {
    if (!cartItem || quantity === 0) return;

    if (customize && countPicoCurva + countCanoRedondo > quantity) return;

    let newAddons: Addon[] = [];

    if (customize) {
      newAddons = [
        ...Array(countPicoCurva)
          .fill(null)
          .map(() => ({
            type: 'bombilla' as const,
            variant: 'pico-curva' as const,
            price: picoCurvaPrice,
          })),
        ...Array(countCanoRedondo)
          .fill(null)
          .map(() => ({
            type: 'bombilla' as const,
            variant: 'caño-redondo' as const,
            price: cañoRedondoPrice,
          })),
      ];
    } else if (defaultBombilla) {
      newAddons = Array(quantity)
        .fill(null)
        .map(() => ({
          type: 'bombilla' as const,
          variant: defaultBombilla,
          price: selectedBombillaPrice,
        }));
    }

    const currentPico = (cartItem.addons || []).filter((a) => a.variant === 'pico-curva').length;
    const currentCano = (cartItem.addons || []).filter((a) => a.variant === 'caño-redondo').length;
    const expectedPico = customize
      ? countPicoCurva
      : defaultBombilla === 'pico-curva'
      ? quantity
      : 0;
    const expectedCano = customize
      ? countCanoRedondo
      : defaultBombilla === 'caño-redondo'
      ? quantity
      : 0;

    if (currentPico === expectedPico && currentCano === expectedCano) {
      return;
    }

    isSyncingFromUI.current = true;

    updateItem(product.id, (item) => ({
      ...item,
      addons: newAddons.length > 0 ? newAddons : undefined,
    }));
  }, [
    defaultBombilla,
    customize,
    countPicoCurva,
    countCanoRedondo,
    quantity,
    cartItem,
    updateItem,
    product.id,
    picoCurvaPrice,
    cañoRedondoPrice,
    selectedBombillaPrice,
  ]);

  if (quantity === 0) return null;

  const totalBombillas = customize
    ? countPicoCurva + countCanoRedondo
    : defaultBombilla
    ? quantity
    : 0;
  const remainingForSecond = quantity - countPicoCurva;

  return (
    <Collapse in={true} timeout="auto">
      <Box
        sx={{
          mt: 3,
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', mb: 2 }}>
            ¿Querés agregar una bombilla al mate?
          </FormLabel>

          <RadioGroup
            value={customize ? 'none' : defaultBombilla ?? derivedDefaultBombilla ?? 'none'}
            onChange={(e) => {
              const val = e.target.value;

              if (val === 'none') {
                setDefaultBombilla(null);
                setCustomize(false);
              } else {
                setDefaultBombilla(val as BombillaOption);
                setCustomize(false);
              }
            }}
          >
            {bombillaOptions.map((option) => (
              <FormControlLabel
                key={option.value ?? 'none'}
                value={option.value ?? 'none'}
                control={<Radio />}
                label={
                  <Typography>
                    {option.label}
                    {option.price > 0 && (
                      <Typography
                        component="span"
                        sx={{ ml: 1, color: 'success.main', fontWeight: 'bold' }}
                      >
                        (+{formatCurrency(option.price)})
                      </Typography>
                    )}
                  </Typography>
                }
                disabled={customize}
              />
            ))}
          </RadioGroup>

          {quantity > 1 && (
            <MuiFormControlLabel
              control={
                <Checkbox checked={customize} onChange={(e) => setCustomize(e.target.checked)} />
              }
              label="Personalizar cantidad por tipo de bombilla"
              sx={{ mt: 2, display: 'block' }}
            />
          )}

          <Collapse in={customize}>
            <Box sx={{ mt: 3, pl: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Bombillas Pico Curva</InputLabel>
                <Select
                  value={countPicoCurva}
                  label="Bombillas Pico Curva"
                  onChange={(e) => setCountPicoCurva(Number(e.target.value))}
                >
                  {[...Array(quantity + 1)].map((_, i) => (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Bombillas Caño Redondo</InputLabel>
                <Select
                  value={countCanoRedondo}
                  label="Bombillas Caño Redondo"
                  onChange={(e) => setCountCanoRedondo(Number(e.target.value))}
                >
                  {[...Array(remainingForSecond + 1)].map((_, i) => (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Collapse>

          {totalBombillas > 0 && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Resumen de bombillas:
              </Typography>
              <Typography variant="body2">
                {countPicoCurva > 0 && `${countPicoCurva} × ${getBombillaLabel('pico-curva')}`}
                {countPicoCurva > 0 && countCanoRedondo > 0 && ' + '}
                {countCanoRedondo > 0 &&
                  `${countCanoRedondo} × ${getBombillaLabel('caño-redondo')}`}
                {!customize &&
                  defaultBombilla &&
                  `${quantity} × ${getBombillaLabel(defaultBombilla)}`}
              </Typography>
              {totalBombillas < quantity && (
                <Typography variant="body2" color="text.secondary">
                  ({quantity - totalBombillas} mate{quantity - totalBombillas !== 1 ? 's' : ''} sin
                  bombilla)
                </Typography>
              )}
            </Box>
          )}
        </FormControl>
      </Box>
    </Collapse>
  );
}