import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceItemService } from './invoice-item.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import {
  UpdateBulkItemStatusDto,
  UpdateItemStatusDto,
} from '../../dto/item-invoice-supplier.dto';
import { ItemInvoiceSupplier } from '../../database/entity/item-invoice-supplier.entity';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('invoice-item')
@ApiTags('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @Post()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Modification de status de plusieurs elements',
  })
  @ApiBody({
    type: UpdateBulkItemStatusDto,
  })
  @ApiCreatedResponse({
    type: [ItemInvoiceSupplier],
  })
  public async updateStatuses(
    @Body() body: UpdateBulkItemStatusDto,
  ): Promise<ItemInvoiceSupplier[]> {
    return this.invoiceItemService.updateStatuses(body);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une commande',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: UpdateItemStatusDto,
  })
  @ApiCreatedResponse({
    type: ItemInvoiceSupplier,
  })
  public async updateStatus(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() status: UpdateItemStatusDto,
  ): Promise<ItemInvoiceSupplier> {
    return this.invoiceItemService.updateStatus(id, status);
  }
}
