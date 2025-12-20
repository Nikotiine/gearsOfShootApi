import { FilterConfig } from '../../database/utils/where-builder';
import { OpticCollarFilter } from './optic-collar.filter';

export const opticCollarWhereFilterConfig: FilterConfig<OpticCollarFilter> = {
  factory: { type: 'relation-string', relation: 'factory', property: 'name' },
  railSize: { type: 'relation-string', relation: 'railSize', property: 'name' },
  name: { type: 'string' },
  reference: { type: 'string' },
};
