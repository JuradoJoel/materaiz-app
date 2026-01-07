import { BombillaOption } from 'src/models/Product';

export const BOMBILLA_OPTIONS = [
  { value: null, label: 'Ninguna', price: 0 },
  { value: 'pico-curva' as BombillaOption, label: 'Bombilla Pico Curva de Acero', price: 8000 },
  { value: 'caño-redondo' as BombillaOption, label: 'Bombilla Caño Redondo', price: 6000 },
];

export const getBombillaPrice = (variant: BombillaOption | null): number => {
  if (!variant) return 0;
  const option = BOMBILLA_OPTIONS.find((opt) => opt.value === variant);
  return option?.price || 0;
};

export const getBombillaLabel = (variant: BombillaOption): string => {
  const option = BOMBILLA_OPTIONS.find((opt) => opt.value === variant);
  return option?.label || '';
};
