import { OpticFilter } from './optic.filter';
import { FilterConfig } from '../../database/utils/where-builder';

export const opticWhereFilterConfig: FilterConfig<OpticFilter> = {
  factory: { relation: 'factory', property: 'name' },
  type: { relation: 'type', property: 'name' },
  focalPlane: { relation: 'focalPlane', property: 'name' },
  name: 'direct',
  reference: 'direct',
};
