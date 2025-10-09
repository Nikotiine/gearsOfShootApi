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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierInvoiceService } from './supplier-invoice.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import {
  CreateInvoiceSupplierDto,
  InvoiceSupplierDto,
  UpdateInvoiceSupplierDto,
} from '../../dto/invoice-supplier.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';

@Controller('supplier-invoice')
@ApiTags('Invoice')
export class SupplierInvoiceController {
  constructor(
    private readonly supplierInvoiceService: SupplierInvoiceService,
  ) {}

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne la commnde fournisseur par son id',
  })
  @ApiOkResponse({
    type: InvoiceSupplierDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<InvoiceSupplierDto> {
    return this.supplierInvoiceService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajout d une nouvelle commande fournisseur',
  })
  @ApiOkResponse({
    type: InvoiceSupplierDto,
  })
  @ApiBody({
    type: CreateInvoiceSupplierDto,
  })
  public async create(
    @Body() invoice: CreateInvoiceSupplierDto,
  ): Promise<InvoiceSupplierDto> {
    return this.supplierInvoiceService.insert(invoice);
  }

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
    type: UpdateInvoiceSupplierDto,
  })
  @ApiOkResponse({
    type: InvoiceSupplierDto,
  })
  public async update(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() invoice: UpdateInvoiceSupplierDto,
  ): Promise<InvoiceSupplierDto> {
    return this.supplierInvoiceService.update(id, invoice);
  }
}
