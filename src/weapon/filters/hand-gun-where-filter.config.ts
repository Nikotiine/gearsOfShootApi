import { FilterConfig } from '../../database/utils/where-builder';
import { HandGunFilter } from './hand-gun.filter';

export const handGunWhereFilterConfig: FilterConfig<HandGunFilter> = {
  percussionTypeId: {
    type: 'relation-number',
    relation: 'percussionType',
    property: 'id',
  },
  name: { type: 'string' },
  reference: { type: 'string' },
  caliberId: { type: 'relation-number', relation: 'caliber', property: 'id' },
  factoryId: { type: 'relation-number', relation: 'factory', property: 'id' },
  category: { type: 'relation-string', relation: 'category', property: 'name' },
  isThreadedBarrel: { type: 'boolean' },
  isOpticReady: { type: 'boolean' },
  triggerTypeId: {
    type: 'relation-number',
    relation: 'triggerType',
    property: 'id',
  },
};
