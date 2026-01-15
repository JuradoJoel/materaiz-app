import { useState, useEffect, useRef } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Collapse,
} from '@mui/material';
import { useCart } from 'src/components/cart/CartContext';
import { Product, Addon, BombillaAddon, CustomDesignAddon } from 'src/models/Product';
import formatCurrency from 'src/utils/formatCurrency';
import { useCustomDesignPrice } from 'src/utils/addonsUtils';

interface CustomDesignSectionProps {
  product: Product;
}

export default function CustomDesignSection({ product }: CustomDesignSectionProps) {
  const { cart, updateItem } = useCart();
  const { data: designPrice = 5000 } = useCustomDesignPrice();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const addons = cartItem?.addons ?? [];

  const isSyncingFromUI = useRef(false);
  const designAddonsFromCart = addons.filter(
    (a): a is CustomDesignAddon => a.type === 'custom_design'
  );

  const derivedEnabled = designAddonsFromCart.length > 0;
  const derivedText = designAddonsFromCart[0]?.details ?? '';

  const [enabled, setEnabled] = useState(false);
  const [designText, setDesignText] = useState('');

  useEffect(() => {
    if (isSyncingFromUI.current) {
      isSyncingFromUI.current = false;
      return;
    }
    if (!cartItem || quantity === 0) return;

    setEnabled(derivedEnabled);
    setDesignText(derivedText);
  }, [cartItem, quantity, derivedEnabled, derivedText]);

  useEffect(() => {
    if (!cartItem || quantity === 0) return;

    let newAddons: Addon[] = [];

    if (enabled) {
      const designAddon: CustomDesignAddon = {
        type: 'custom_design',
        price: designPrice,
        details: designText.trim() || null,
      };

      newAddons = Array(quantity).fill(designAddon);
    }

    // evitar updates innecesarios
    const currentCount = designAddonsFromCart.length;
    const currentText = designAddonsFromCart[0]?.details ?? '';

    if (currentCount === (enabled ? quantity : 0) && currentText === designText.trim()) {
      return;
    }

    isSyncingFromUI.current = true;

    // mantener otros addons
    const otherAddons = addons.filter((a): a is BombillaAddon => a.type !== 'custom_design');

    const updatedAddons = [...otherAddons, ...newAddons];

    updateItem(product.id, (item) => ({
      ...item,
      addons: updatedAddons.length > 0 ? updatedAddons : undefined,
    }));
  }, [enabled, designText, quantity, designPrice, cartItem, updateItem, product.id, addons]);

  if (quantity === 0) return null;

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
            ¿Querés personalizar tu mate con un grabado en la virola?
          </FormLabel>

          <FormControlLabel
            control={<Checkbox checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />}
            label={
              <Typography>
                Sí, agregar diseño
                <Typography
                  component="span"
                  sx={{ ml: 1, color: 'success.main', fontWeight: 'bold' }}
                >
                  (+{formatCurrency(designPrice)})
                </Typography>
              </Typography>
            }
          />

          <Collapse in={enabled}>
            <Box sx={{ mt: 3, pl: 2 }}>
              <TextField
                label="Texto o descripción del diseño"
                value={designText}
                onChange={(e) => setDesignText(e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
            </Box>
          </Collapse>

          {enabled && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Resumen del diseño:
              </Typography>
              <Typography variant="body2">
                {quantity} × Diseño personalizado con texto: "
                {designText || 'Sin texto especificado'}"
              </Typography>
            </Box>
          )}
        </FormControl>
      </Box>
    </Collapse>
  );
}
