import { FilterConfig } from '../../../database/utils/where-builder';
import { FactoryFilter } from './factory.filter';

export const factoryWhereFilterConfig: FilterConfig<FactoryFilter> = {
  type: { type: 'relation-string', relation: 'type', property: 'name' },
  name: { type: 'string' },
  reference: { type: 'string' },
};
