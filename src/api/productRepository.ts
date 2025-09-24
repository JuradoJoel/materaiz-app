import { Product } from 'src/models/Product';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

export class ProductRepository {
  keys = {
    all: () => ['products'],
  };

  getAll = async () => {
    const { data } = await httpClient.get<Product[]>('products');
    return data;
  };
}

const repo = new ProductRepository();

export const useAllProductsQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });
