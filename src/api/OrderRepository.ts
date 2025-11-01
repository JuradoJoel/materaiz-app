import { httpClient } from 'src/utils/httpClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CheckoutPayload {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  total_amount: number;
  items: {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];
}

export interface CheckoutResponse {
  success: boolean;
  orderId: number;
  message?: string;
}

export class OrderRepository {
  keys = {
    create: () => ['orders', 'create'],
  };

  create = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
    const { data } = await httpClient.post<CheckoutResponse>('app/orders', payload);
    return data;
  };
}

const repo = new OrderRepository();

// Hook para usar en el formulario
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: repo.keys.create(),
    mutationFn: repo.create,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
