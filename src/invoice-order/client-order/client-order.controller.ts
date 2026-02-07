import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ClientOrderService } from './client-order.service';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import {
  ClientOrderDto,
  CreateClientOrderDto,
} from '../../dto/client-order.dto';
import {
  QueryUser,
  ReqQueryUser,
} from '../../decorator/req-query-user.decorator';
import {
  ApiPaginatedResponse,
  PaginatedResponseDto,
} from '../../decorator/paginated-response.decorator';
import { QueryFilter } from '../../decorator/query-filter.decorator';
import { ReqQueryFilter } from '../../decorator/req-query-filter.decorator';
import { ClientOrderFilter } from './filters/client-order.filter';

@Controller('client-order')
@ApiTags('clientOrder')
export class ClientOrderController {
  constructor(private readonly clientOrderService: ClientOrderService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiPaginatedResponse(ClientOrderDto)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de tous les reducteurs de son disponible',
  })
  @QueryFilter(ClientOrderFilter)
  public async findAll(
    @ReqQueryFilter() filters: ClientOrderFilter,
  ): Promise<PaginatedResponseDto<ClientOrderDto>> {
    return await this.clientOrderService.findAll(filters);
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOkResponse({
    type: ClientOrderDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail de la commande client',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ClientOrderDto> {
    return await this.clientOrderService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajout d une nouvelle commande client',
  })
  @ApiOkResponse({
    type: ClientOrderDto,
  })
  @ApiBody({
    type: CreateClientOrderDto,
  })
  public async create(
    @ReqQueryUser() user: QueryUser,
    @Body() order: CreateClientOrderDto,
  ): Promise<ClientOrderDto> {
    return this.clientOrderService.insert(order, user);
  }

  @Put(SwaggerDescription.ID)
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition de la commande',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: ClientOrderDto,
  })
  @ApiCreatedResponse({
    type: ClientOrderDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() optic: ClientOrderDto,
  ): Promise<ClientOrderDto> {
    return await this.clientOrderService.update(id, optic);
  }
}
