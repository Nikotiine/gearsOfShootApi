import { OpticFilter } from './optic.filter';
import { FilterConfig } from '../../database/utils/where-builder';

export const opticWhereFilterConfig: FilterConfig<OpticFilter> = {
  factory: { type: 'relation-string', relation: 'factory', property: 'name' },
  type: { type: 'relation-string', relation: 'type', property: 'name' },
  focalPlane: {
    type: 'relation-string',
    relation: 'focalPlane',
    property: 'name',
  },
  name: { type: 'string' },
  reference: { type: 'string' },
};
