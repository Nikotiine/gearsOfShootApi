import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { SupplierDto } from '../../dto/supplier.dto';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
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
