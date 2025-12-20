import { FilterConfig } from '../../../database/utils/where-builder';
import { MagazineFilter } from './magazine.filter';

export const magazineFilterConfig: FilterConfig<MagazineFilter> = {
  factory: { type: 'relation-string', relation: 'factory', property: 'name' },
  caliber: { type: 'relation-string', relation: 'caliber', property: 'name' },
  category: { type: 'relation-string', relation: 'category', property: 'name' },
  name: { type: 'string' },
  reference: { type: 'string' },
  capacity: { type: 'number' },
};
