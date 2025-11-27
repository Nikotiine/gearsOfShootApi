import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
/**
 * Extrait une propriété spécifique depuis les paramètres de requête HTTP
 * (`req.query`) et l’injecte directement dans la méthode du contrôleur.
 *
 * @example
 * ```ts
 * public async findAllOptics(
 *   @ReqQueryFilter() filters: OpticFilter
 * ) {
 *   return this.opticService.findAll(filters);
 * }
 * ```
 *
 * Cela revient à écrire manuellement :
 * ```ts
 * req.query.filters
 * ```
 *
 * Vous pouvez également personnaliser le nom de la propriété à extraire :
 * ```ts
 * public async findAll(
 *   @ReqQueryFilter('search') searchParams: SearchDto
 * ) {}
 * ```
 *
 * @remarks
 * - Utilise l'objet `Request` d'Express.
 * - Ne réalise aucune validation ni transformation des données.
 * - La valeur renvoyée est directement celle de `req.query[property]`.
 *
 * @param property - Le nom du paramètre de requête à extraire (par défaut `"filters"`).
 * @param ctx - Le contexte d’exécution NestJS (injecté automatiquement).
 * @returns La valeur de `req.query[property]`, ou `undefined` si elle n’existe pas.
 */
export const ReqQueryFilter = createParamDecorator(
  (property: string = 'filters', ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const query = req.query;
    return query[property];
  },
);
