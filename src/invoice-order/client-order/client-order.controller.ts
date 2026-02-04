import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ClientOrderService } from './client-order.service';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/strategy/roles.guard';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { InvoiceSupplierDto } from '../../dto/invoice-supplier.dto';
import { CreateClientOrderDTO } from '../../dto/client-order.dto';

@Controller('client-order')
@ApiTags('clientOrder')
export class ClientOrderController {
  constructor(private readonly clientOrderService: ClientOrderService) {}

  @Post()
  @Roles(UserRoles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajout d une nouvelle commande client',
  })
  @ApiOkResponse({
    type: CreateClientOrderDTO,
  })
  @ApiBody({
    type: CreateClientOrderDTO,
  })
  public async create(
    @Body() order: CreateClientOrderDTO,
  ): Promise<InvoiceSupplierDto> {
    return this.clientOrderService.insert(order);
  }
}
