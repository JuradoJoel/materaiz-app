import { useQuery } from '@tanstack/react-query';
import { httpClient } from 'src/utils/httpClient';

// interface para precios
export interface AddonPrices {
  custom_design: number;
  extra_bombilla_caño_redondo: number;
  extra_bombilla_pico_curva_acero: number;
  [key: string]: number; 
}

export const fetchAddonPrices = async (): Promise<AddonPrices> => {
  try {
    const { data } = await httpClient.get<{ success: boolean; data: Record<string, { price: number }> }>(
      'app/addon-prices'
    );

    if (!data.success) {
      throw new Error('Respuesta no exitosa del servidor');
    }

    const prices: AddonPrices = {} as AddonPrices;
    Object.entries(data.data).forEach(([key, value]) => {
      prices[key as keyof AddonPrices] = Number(value.price);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching addon prices:', error);
    throw error;
  }
};

export const useAddonPrices = () =>
  useQuery({ queryKey: ['addon_prices'], queryFn: fetchAddonPrices, staleTime: 1000 * 60 * 30, cacheTime: 1000 * 60 * 60, retry: 2, placeholderData: {
        custom_design: 10000,
        extra_bombilla_caño_redondo: 6000,
        extra_bombilla_pico_curva_acero: 8001,
      } as AddonPrices });

export const useCustomDesignPrice = () => {
  const { data } = useAddonPrices();
  return data?.custom_design;
};

export const useBombillaCañoRedondoPrice = () => {
  const { data } = useAddonPrices();
  return data?.extra_bombilla_caño_redondo;
};

export const useBombillaPicoCurvaPrice = () => {
  const { data } = useAddonPrices();
  return data?.extra_bombilla_pico_curva_acero;
};