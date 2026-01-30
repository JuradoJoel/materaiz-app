import { Product } from 'src/models/Product';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export class ProductRepository {
  keys = {
    all: () => ['products'],
    one: (id: number) => ['products', { id }],
    infinite: () => ['products', 'infinite'],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('app/products?all=true');

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

  getPage = async (page: number = 0, limit: number = 20) => {
    const { data } = await httpClient.get<any[]>(`app/products?page=${page}&limit=${limit}`);
    const normalized: Product[] = data.map((p) => ({
      ...p,
      categories: [{ id: p.category_id, name: '' }],
    }));

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

export const useProductsInfiniteQuery = () =>
  useInfiniteQuery(repo.keys.infinite(), ({ pageParam = 0 }) => repo.getPage(pageParam, 20), {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length;
    },
    staleTime: 5 * 60 * 1000,
  });

  export const useHomeProducts = () => {
    const query = useAllProductsQuery();
  
    return {
      ...query,
      products: query.data ?? [],
    };
  };
  
  export const useCustomDesignProducts = () => {
    const query = useAllProductsQuery();
  
    return {
      ...query,
      products: (query.data ?? []).filter(p => p.is_custom_design),
    };
  };
  