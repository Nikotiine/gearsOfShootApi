import { FilterConfig } from '../../../database/utils/where-builder';
import { ClientOrderFilter } from './client-order.filter';

export const clientOrderWhereFilterConfig: FilterConfig<ClientOrderFilter> = {
  invoiceStatus: { type: 'string' },
};
