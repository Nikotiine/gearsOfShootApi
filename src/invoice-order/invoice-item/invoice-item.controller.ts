import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
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
  CreateItemInvoiceSupplierDto,
  UpdateItemStatusDto,
} from '../../dto/item-invoice-supplier.dto';
import { ItemInvoiceSupplier } from '../../database/entity/item-invoice-supplier.entity';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';

@Controller('invoice-item')
@ApiTags('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @Put(SwaggerDescription.ID)
  @UseGuards(JwtAuthGuard)
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
    console.log('IIDDDDDDDD', id);
    console.log('IIDDDDDDDD', status);
    return this.invoiceItemService.updateStatus(id, status);
  }
}
