import { useQuery } from '@tanstack/react-query';
import { Category } from 'src/models/Category';
import { httpClient } from 'src/utils/httpClient';

export class CategoryRepository {
  keys = {
    all: () => ['categories'],
  };

  getAll = async () => {
    const { data } = await httpClient.get<Category[]>('app/categories');
    return data;
  };
}

const repo = new CategoryRepository();

export const useAllCategoriesQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });
