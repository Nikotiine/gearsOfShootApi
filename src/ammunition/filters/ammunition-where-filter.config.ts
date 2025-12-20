import { AmmunitionFilter } from './ammunition.filter';
import { FilterConfig } from '../../database/utils/where-builder';

export const ammunitionWhereFilterConfig: FilterConfig<AmmunitionFilter> = {
  factory: {
    type: 'relation-string',
    relation: 'factory',
    property: 'name',
  },
  caliber: { type: 'relation-string', relation: 'caliber', property: 'name' },
  category: { type: 'relation-string', relation: 'category', property: 'name' },
  name: { type: 'string' },
  reference: { type: 'string' },
};
