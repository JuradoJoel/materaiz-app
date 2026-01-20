import { BombillaOption } from 'src/models/Product';
import { useBombillaPicoCurvaPrice, useBombillaCañoRedondoPrice } from 'src/utils/addonsUtils';

const BOMBILLA_OPTIONS_STATIC = [
  { value: null, label: 'Ninguna' },
  { value: 'pico-curva' as BombillaOption, label: 'Bombilla Pico Curva de Acero' },
  { value: 'caño-redondo' as BombillaOption, label: 'Bombilla Caño Redondo' },
];

export const useBombillaOptions = () => {
  const picoCurvaPrice = useBombillaPicoCurvaPrice();
  const cañoRedondoPrice = useBombillaCañoRedondoPrice();

  return [
    { value: null, label: 'Ninguna', price: 0 },
    { value: 'pico-curva' as BombillaOption, label: 'Bombilla Pico Curva de Acero', price: picoCurvaPrice ?? 8000 },
    { value: 'caño-redondo' as BombillaOption, label: 'Bombilla Caño Redondo', price: cañoRedondoPrice ?? 6000 },
  ];
};

export const useBombillaPrice = (variant: BombillaOption | null) => {
  const picoCurvaPrice = useBombillaPicoCurvaPrice();
  const cañoRedondoPrice = useBombillaCañoRedondoPrice();

  if (!variant) return 0;

  if (variant === 'pico-curva') return picoCurvaPrice ?? 8000;
  if (variant === 'caño-redondo') return cañoRedondoPrice ?? 6000;
  
  return 0;
};

export const getBombillaLabel = (variant: BombillaOption | null): string => {
  const option = BOMBILLA_OPTIONS_STATIC.find((opt) => opt.value === variant);
  return option?.label || '';
};

export const getBombillaDisplayText = (variant: BombillaOption | null): string => {
  const label = getBombillaLabel(variant);
  if (!variant) return label;
  const price = variant === 'pico-curva' ? 8000 : variant === 'caño-redondo' ? 6000 : 0;
  
  return price > 0 ? `${label} (+$${price.toLocaleString('es-AR')})` : label;
};