import { FilterConfig } from '../../database/utils/where-builder';
import { OpticCollarFilter } from './optic-collar.filter';

export const opticCollarWhereFilterConfig: FilterConfig<OpticCollarFilter> = {
  factory: { relation: 'factory', property: 'name' },
  railSize: { relation: 'railSize', property: 'name' },
  name: 'direct',
  reference: 'direct',
};
