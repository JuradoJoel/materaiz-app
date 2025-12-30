import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Collapse,
} from '@mui/material';
import { useCart } from 'src/components/cart/CartContext';
import { Product, BombillaOption } from 'src/models/Product';
import { BOMBILLA_OPTIONS, getBombillaPrice } from 'src/constants/bombillas';
import formatCurrency from 'src/utils/formatCurrency';

interface MateAddonsSectionProps {
  product: Product;
}

export default function MateAddonsSection({ product }: MateAddonsSectionProps) {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const currentBombilla: BombillaOption | null = cartItem?.addonBombilla ?? null;

  if (quantity === 0) return null;

  const basePrice = product.discount_price || product.original_price;
  const bombillaPrice = getBombillaPrice(currentBombilla);
  const totalWithAddon = basePrice + bombillaPrice;

  const handleChange = (newOption: BombillaOption | null) => {
    if (!cartItem) return;

    const updatedItem = {
      ...cartItem,
      addonBombilla: newOption === null ? undefined : newOption,
    };

    removeFromCart(product.id);
    addToCart(updatedItem);
  };

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
          <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', mb: 1 }}>
            ¿Querés agregar una bombilla al mate?
          </FormLabel>
          <RadioGroup
            value={currentBombilla ?? 'none'}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'none') {
                handleChange(null);
              } else {
                handleChange(val as BombillaOption);
              }
            }}
          >
            {BOMBILLA_OPTIONS.map((option) => (
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
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Collapse>
  );
}
