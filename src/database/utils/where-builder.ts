import { ILike, FindOptionsWhere } from 'typeorm';

/**
 * Définit comment chaque propriété doit être convertie en filtre TypeORM.
 */
export type FilterConfig<T> = {
  [K in keyof T]?:
    | 'direct' // filtre sur un champ direct
    | { relation: string; property: string }; // filtre sur relation.property
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
    if (!value) continue;

    const rule = config[key];

    if (!rule) continue;

    // --- Cas champ direct ---
    if (rule === 'direct') {
      where[key as unknown as keyof TEntity] = ILike(`%${value}%`) as any;
      continue;
    }

    // --- Cas relation ---
    if (typeof rule === 'object' && rule.relation) {
      where[rule.relation as keyof TEntity] = {
        [rule.property]: ILike(`%${value}%`),
      } as any;
    }
  }

  return where;
}
