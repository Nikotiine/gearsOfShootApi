import { AmmunitionFilter } from './ammunition.filter';
import { FilterConfig } from '../../database/utils/where-builder';

export const ammunitionWhereFilterConfig: FilterConfig<AmmunitionFilter> = {
  factoryId: {
    type: 'relation-number',
    relation: 'factory',
    property: 'id',
  },
  caliberId: { type: 'relation-number', relation: 'caliber', property: 'id' },
  category: { type: 'relation-string', relation: 'category', property: 'name' },
  name: { type: 'string' },
  reference: { type: 'string' },
};
