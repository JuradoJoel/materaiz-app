import { Collection, createMSWHandlers } from './utils';
import { mockWholesaleCategories } from 'src/utils/mock_wholesale_categories';

let collection = new Collection(mockWholesaleCategories);

const handlers = createMSWHandlers('wholesale-categories', collection).toArray();

export const wholesaleCategoriesHandlers = handlers;
