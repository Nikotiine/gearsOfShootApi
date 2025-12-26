import { FilterConfig } from '../../database/utils/where-builder';
import { RiffleFilter } from './riffle.filter';

export const riffleWhereFilterConfig: FilterConfig<RiffleFilter> = {
  factoryId: { type: 'relation-number', relation: 'factory', property: 'id' },
  name: { type: 'string' },
  reference: { type: 'string' },
  caliberId: { type: 'relation-number', relation: 'caliber', property: 'id' },
  railSizeId: { type: 'relation-number', relation: 'railSize', property: 'id' },
  percussionTypeId: {
    type: 'relation-number',
    relation: 'percussionType',
    property: 'id',
  },
  category: { type: 'relation-string', relation: 'category', property: 'name' },
  isThreadedBarrel: { type: 'boolean' },
};
