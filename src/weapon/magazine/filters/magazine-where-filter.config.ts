import { FilterConfig } from '../../../database/utils/where-builder';
import { MagazineFilter } from './magazine.filter';

export const magazineFilterConfig: FilterConfig<MagazineFilter> = {
  factory: { relation: 'factory', property: 'name' },
  caliber: { relation: 'caliber', property: 'name' },
  category: { relation: 'category', property: 'name' },
  name: 'direct',
  reference: 'direct',
};
