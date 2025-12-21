import { Product } from 'src/models/Product';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';
import { useQuery } from '@tanstack/react-query';

export class ProductRepository {
  keys = {
    all: () => ['products'],
    one: (id: number) => ['products', { id }],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('app/products');

    const normalized: Product[] = data.map((p) => ({
      ...p,
      categories: [{ id: p.category_id, name: '' }],
    }));

    return normalized;
  };

  getOne = async (id: number) => {
    const { data } = await httpClient.get<any>(`app/products/${id}`);

    const normalized: Product = {
      ...data,
      categories: [{ id: data.category_id, name: '' }],
    };

    return normalized;
  };
}

const repo = new ProductRepository();

export const useAllProductsQuery = () =>
  useQuery({
    queryKey: repo.keys.all(),
    queryFn: () => repo.getAll(),
  });

export const useOneProductQuery = (id: number) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.getOne(id) });
