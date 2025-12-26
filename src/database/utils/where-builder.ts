import { Equal, FindOptionsWhere, ILike } from 'typeorm';

export type FilterRule =
  | { type: 'string' } // ILike
  | { type: 'number' } // Equal
  | { type: 'boolean' } // Equal
  | { type: 'relation-string'; relation: string; property: string }
  | { type: 'relation-number'; relation: string; property: string };
/**
 * Définit comment chaque propriété doit être convertie en filtre TypeORM.
 */
export type FilterConfig<T> = {
  [K in keyof T]?: FilterRule;
};

/**
 * Construit dynamiquement un objet `where` TypeORM basé sur un filtre et une configuration.
 *
 * - Supporte les champs directs (`field`)
 * - Supporte les relations (`relation.property`)
 *
 * @param filter - Les valeurs reçues en query.
 * @param config - Mapping décrivant comment chaque propriété doit être traduite en condition TypeORM.
 */
export function buildWhereGeneric<TFilter, TEntity>(
  filter: TFilter,
  config: FilterConfig<TFilter>,
): FindOptionsWhere<TEntity> {
  const where: FindOptionsWhere<TEntity> = {};

  for (const key in filter) {
    const value = filter[key];
    if (value === undefined || value === null || value === '') continue;

    const rule = config[key];
    if (!rule) continue;

    // --- Champ string ---
    if (rule.type === 'string') {
      where[key as unknown as keyof TEntity] = ILike(`%${value}%`) as any;
    }

    // --- Champ number / boolean ---
    if (rule.type === 'number' || rule.type === 'boolean') {
      where[key as unknown as keyof TEntity] = Equal(value) as any;
    }

    // --- Relation string ---
    if (rule.type === 'relation-string') {
      where[rule.relation as keyof TEntity] = {
        [rule.property]: ILike(`%${value}%`),
      } as any;
    }

    // --- Relation number ---
    if (rule.type === 'relation-number') {
      where[rule.relation as keyof TEntity] = {
        [rule.property]: Equal(value),
      } as any;
    }
  }

  return where;
}
