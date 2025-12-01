import { httpClient } from 'src/utils/httpClient';
import { useMutation } from '@tanstack/react-query';

export interface ShippingOption {
  service: string;
  cost: number;
  estimatedDays: string;
  currency: string;
  deliveryType: string;
}

export interface ShippingResponse {
  success: boolean;
  data: {
    options: ShippingOption[];
    cheapest?: ShippingOption;
    fastest?: ShippingOption;
  };
  message?: string;
}

export class ShippingRepository {
  calculate = async (payload: {
    destCP: string;
    weight: number;
    dimensions: { length: number; width: number; height: number };
  }): Promise<ShippingOption[]> => {
    const { data } = await httpClient.post<ShippingResponse>('/app/shipping/calculate', payload);
    if (!data.success) throw new Error(data.message || 'Error al calcular envío');
    return data.data.options;
  };
}

const repo = new ShippingRepository();

export const useCalculateShippingMutation = () =>
  useMutation({
    mutationFn: repo.calculate,
    onSuccess: () => {
      console.log('Costo de envío calculado correctamente');
    },
    onError: (error) => {
      console.error('Error al calcular el costo de envío:', error);
    },
  });
