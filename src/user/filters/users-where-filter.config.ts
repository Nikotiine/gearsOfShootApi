import { FilterConfig } from '../../database/utils/where-builder';
import { UserFilter } from './users.filter';

export const usersWhereFilterConfig: FilterConfig<UserFilter> = {
  role: { type: 'string' },
  costumerRole: { type: 'string' },
  email: { type: 'string' },
  lastName: { type: 'string' },
};
