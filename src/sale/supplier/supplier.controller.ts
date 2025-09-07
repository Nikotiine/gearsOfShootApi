import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { SupplierDto } from '../../dto/supplier.dto';

@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des plans focal',
  })
  @ApiOkResponse({
    type: [SupplierDto],
  })
  public async findAll(): Promise<SupplierDto[]> {
    return await this.supplierService.findAll();
  }
}
