import { BombillaOption } from 'src/models/Product';

type BombillaConfig = {
  value: BombillaOption | null;
  label: string;
  price: number;
};

export const BOMBILLA_OPTIONS: BombillaConfig[] = [
  {
    value: null,
    label: 'No',
    price: 0,
  },
  {
    value: 'pico-curva',
    label: 'Bombilla pico curva de Acero',
    price: 6000,
  },
  {
    value: 'caño-redondo',
    label: 'Bombilla de acero caño redondo con dije de bronce',
    price: 8000,
  },
];

export const getBombillaLabel = (option: BombillaOption | null): string => {
  const found = BOMBILLA_OPTIONS.find((opt) => opt.value === option);
  return found?.label.replace('Bombilla ', '') || '';
};

export const getBombillaPrice = (option: BombillaOption | null): number => {
  const found = BOMBILLA_OPTIONS.find((opt) => opt.value === option);
  return found?.price ?? 0;
};
