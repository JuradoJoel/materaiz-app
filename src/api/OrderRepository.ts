import { httpClient } from 'src/utils/httpClient';
import { useMutation } from '@tanstack/react-query';

export interface CheckoutPayload {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address?: string | null;
  };
  total_amount: number;
  shipping_cost: number;
  is_home_delivery: boolean;
  items: OrderItemPayload[];
}

export interface AddonPayload {
  type: string;
  description: string;
  price: number;
  details?: string | null;
}

export interface OrderItemPayload {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  addons?: AddonPayload[];
}

export interface CheckoutResponse {
  success: boolean;
  orderId: number;
  message?: string;
}

export class OrderRepository {
  keys = {
    list: () => ['orders', 'list'] as const,
  };

  create = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
    const { data } = await httpClient.post<CheckoutResponse>('app/orders', payload);
    return data;
  };
}

const repo = new OrderRepository();

// Hook para usar en el formulario
export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: (data: CheckoutPayload) => repo.create(data),
  });
