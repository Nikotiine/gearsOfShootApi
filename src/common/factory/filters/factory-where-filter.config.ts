import { FilterConfig } from '../../../database/utils/where-builder';
import { FactoryFilter } from './factory.filter';

export const factoryWhereFilterConfig: FilterConfig<FactoryFilter> = {
  type: { relation: 'type', property: 'name' },
  name: 'direct',
  reference: 'direct',
};
