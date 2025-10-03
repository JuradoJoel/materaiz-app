import { adminUserHandlers } from './adminUsersHandlers';
import { authHandlers } from './authHandlers';
import { productsHandlers } from './productsHandlers';
import { wholesaleHandlers } from './wholesaleHandlers';
import { wholesaleCategoriesHandlers } from './wholesaleCategoriesHandlers';

/**
 * This is the list of all handlers that will be used by MSW.
 * Add here all the handlers you want to use.
 */
export const handlers = [
  ...authHandlers,
  ...adminUserHandlers,
  ...productsHandlers,
  ...wholesaleHandlers,
  ...wholesaleCategoriesHandlers,
];
