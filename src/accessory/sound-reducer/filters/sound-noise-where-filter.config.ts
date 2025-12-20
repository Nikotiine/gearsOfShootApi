import { FilterConfig } from '../../../database/utils/where-builder';
import { SoundNoiseFilter } from './sound-noise.reducer.filter';

export const soundNoiseFilterConfig: FilterConfig<SoundNoiseFilter> = {
  factory: { type: 'relation-string', relation: 'factory', property: 'name' },
  caliber: { type: 'relation-string', relation: 'caliber', property: 'name' },
  name: { type: 'string' },
  reference: { type: 'string' },
};
