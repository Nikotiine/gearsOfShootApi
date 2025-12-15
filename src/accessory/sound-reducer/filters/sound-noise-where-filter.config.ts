import { FilterConfig } from '../../../database/utils/where-builder';
import { SoundNoiseFilter } from './sound-noise.reducer.filter';

export const soundNoiseFilterConfig: FilterConfig<SoundNoiseFilter> = {
  factory: { relation: 'factory', property: 'name' },
  caliber: { relation: 'caliber', property: 'name' },
  name: 'direct',
  reference: 'direct',
};
