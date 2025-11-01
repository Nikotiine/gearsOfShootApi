import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { StockService } from './stock.service';
import { CreateStockDto, StockDto } from '../../dto/stock.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { StockableObject } from '../../enum/stock-item.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('stock')
@ApiTags('Stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @Get('/by/:object/:objectId')
  @ApiOkResponse({
    type: StockDto,
  })
  @ApiParam({
    name: 'object',
  })
  @ApiParam({
    name: 'objectId',
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID,
    description: 'Stock par id d objet',
  })
  public async findByStockableObjectAndId(
    @Param('object') object: StockableObject,
    @Param('objectId') objectId: number,
  ): Promise<StockDto> {
    return this.stockService.findLastByObjectId(objectId, object);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiBody({
    type: CreateStockDto,
  })
  @ApiCreatedResponse({
    type: StockDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Mise a jour du stock',
  })
  public async updateStock(@Body() stock: CreateStockDto): Promise<StockDto> {
    return this.stockService.insert(stock);
  }
}
