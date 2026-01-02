import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiQuery,
  ApiQueryOptions,
  getSchemaPath,
} from '@nestjs/swagger';

/**
 * Décorateur personnalisé permettant de déclarer un objet de filtre
 * entièrement typé dans Swagger, et d’utiliser un schéma imbriqué
 * (Deep Object) pour les paramètres de requête.
 *
 * Ce décorateur simplifie la documentation des endpoints qui reçoivent
 * des filtres complexes via `req.query.filters`.
 *
 * @example
 * ```ts
 * @Get('all')
 * @QueryFilter(OpticFilter)
 * public async findAllOptics(
 *   @ReqQueryFilter() filters: OpticFilter
 * ) {
 *   return this.opticService.findAll(filters);
 * }
 * ```
 *
 * Swagger générera alors une section "filters" contenant toutes les
 * propriétés du DTO `OpticFilter`.
 *
 * @remarks
 * - Utilise `ApiExtraModels` pour enregistrer le modèle dans Swagger.
 * - Utilise `ApiQuery` avec `style: 'deepObject'` pour supporter
 *   les paramètres de requête imbriqués :
 *   ```
 *   /endpoint?filters[name]=abc&filters[factory]=Vortex
 *   ```
 * - Compatible avec les générateurs OpenAPI (ex: swagger-typescript-api).
 *
 * @param filterQuery - La classe du DTO représentant le schéma du filtre.
 * @param options - Options supplémentaires facultatives pour `ApiQuery`.
 *
 * @returns Un décorateur appliquant automatiquement la configuration Swagger.
 */
export function QueryFilter(
  filterQuery: new () => object,
  options?: ApiQueryOptions,
) {
  return applyDecorators(
    ApiExtraModels(filterQuery),
    ApiQuery({
      name: 'filters',
      description: 'Filtre de recherche pour reponse paginé',
      required: false,
      style: 'deepObject',
      schema: {
        $ref: getSchemaPath(filterQuery),
      },
      ...options,
    }),
  );
}
