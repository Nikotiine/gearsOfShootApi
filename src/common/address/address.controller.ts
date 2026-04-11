import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';

import { AddressDto } from '../../dto/address.dto';
import {
  QueryUser,
  ReqQueryUser,
} from '../../decorator/req-query-user.decorator';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Get the addresses',
    description: 'Get the addresses for the given address',
  })
  @ApiOkResponse({
    type: [AddressDto],
  })
  public async getUserAddresses(
    @ReqQueryUser() user: QueryUser,
  ): Promise<AddressDto[]> {
    return this.addressService.findAllAddressByUserId(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Create a new address',
  })
  @ApiCreatedResponse({
    type: AddressDto,
  })
  @ApiBody({
    type: AddressDto,
  })
  public async insertUserAddress(
    @ReqQueryUser() user: AddressDto,
    @Body() addressDto: AddressDto,
  ) {
    return this.addressService.addAddressToUser(addressDto, user.id);
  }
}
