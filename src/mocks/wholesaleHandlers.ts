import { Collection, createMSWHandlers } from './utils';
import { wholesaleData } from 'src/utils/mock_wholesale';

let collection = new Collection(wholesaleData);

const handlers = createMSWHandlers('wholesale', collection).toArray();

export const wholesaleHandlers = handlers;
