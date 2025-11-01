import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierInvoiceService } from './supplier-invoice.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import {
  CountInvoicesDto,
  CreateInvoiceSupplierDto,
  InvoiceSupplierDto,
  UpdateInvoiceSupplierDto,
} from '../../dto/invoice-supplier.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';

@Controller('supplier-invoice')
@ApiTags('Invoice')
export class SupplierInvoiceController {
  constructor(
    private readonly supplierInvoiceService: SupplierInvoiceService,
  ) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de tous les commandes',
  })
  @ApiOkResponse({
    type: [InvoiceSupplierDto],
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrer les factures selon leur statut',
  })
  public async findAll(
    @Query('status') status?: InvoiceOrderStatus,
  ): Promise<InvoiceSupplierDto[]> {
    return await this.supplierInvoiceService.findAll(status);
  }

  @Get(SwaggerDescription.COUNT)
  @ApiOperation({
    summary: SwaggerDescription.COUNT_SUMMARY,
    description: 'Compte les commandes suivant leur status',
  })
  @ApiOkResponse({
    type: CountInvoicesDto,
  })
  public async countInvoice(): Promise<CountInvoicesDto> {
    return this.supplierInvoiceService.countInvoiceForEachStatus();
  }

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

  @Post('/archive/:id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Passe la commende en archive',
  })
  @ApiOkResponse({
    type: InvoiceSupplierDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async archive(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<InvoiceSupplierDto> {
    return this.supplierInvoiceService.archive(id);
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

  @Delete(SwaggerDescription.ID)
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppresion logique de la commande fournisseur',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return this.supplierInvoiceService.delete(id);
  }
}
