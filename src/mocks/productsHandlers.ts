import { Collection, createMSWHandlers } from './utils';
import { productsData } from 'src/utils/mock_products';

let collection = new Collection(productsData);

const handlers = createMSWHandlers('products', collection).toArray();

export const productsHandlers = handlers;
