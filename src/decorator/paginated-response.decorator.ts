import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Résultats paginés', isArray: true })
  data: T[];

  @ApiProperty({
    example: 42,
    description: 'Nombre total d’éléments disponibles',
  })
  total: number;

  @ApiProperty({
    example: 10,
    description: 'Nombre maximum de résultats renvoyés',
  })
  limit: number;

  @ApiProperty({
    example: 0,
    description: 'Décalage utilisé pour la pagination',
  })
  offset: number;

  constructor(data: T[], total: number, limit: number, offset: number) {
    this.data = data;
    this.total = total;
    this.limit = limit;
    this.offset = offset;
  }
}

/**
 * Helper Swagger pour déclarer dynamiquement un modèle paginé.
 *
 * Exemple d'utilisation :
 * @ApiPaginatedResponse(AmmunitionDto)
 */
export const ApiPaginatedResponse = <
  TModel extends new (...args: any[]) => any,
>(
  model: TModel,
) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiExtraModels(PaginatedResponseDto, model)(target, key, descriptor);
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })(target, key, descriptor);
  };
};
