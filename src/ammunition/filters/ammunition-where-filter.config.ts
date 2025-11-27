import { AmmunitionFilter } from './ammunition.filter';
import { FilterConfig } from '../../database/utils/where-builder';

export const ammunitionWhereFilterConfig: FilterConfig<AmmunitionFilter> = {
  factory: { relation: 'factory', property: 'name' },
  caliber: { relation: 'caliber', property: 'name' },
  category: { relation: 'category', property: 'name' },
  name: 'direct',
  reference: 'direct',
};
