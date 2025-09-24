import { Product } from 'src/models/Product';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

export class ProductRepository {
  keys = {
    all: () => ['products'],
    one: (id: number) => ['products', { id }],
  };

  getAll = async () => {
    const { data } = await httpClient.get<Product[]>('products');
    return data;
  };

  getOne = async (id: number) => {
    const { data } = await httpClient.get<Product>(`products/${id}`);
    return data;
  };
}

const repo = new ProductRepository();

export const useAllProductsQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useOneProductQuery = (id: number) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.getOne(id) });
