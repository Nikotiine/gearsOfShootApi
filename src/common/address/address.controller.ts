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
import { AddressService } from './address.service';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';

import { AddressDto, CreateAddressDto } from '../../dto/address.dto';
import {
  QueryUser,
  ReqQueryUser,
} from '../../decorator/req-query-user.decorator';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('user')
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

  @Get(SwaggerDescription.FIND_BY_ID)
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Get the addresses for the given address',
  })
  @ApiOkResponse({
    type: AddressDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async getById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<AddressDto> {
    return this.addressService.findById(id);
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
    type: CreateAddressDto,
  })
  public async insertUserAddress(
    @ReqQueryUser() user: QueryUser,
    @Body() addressDto: CreateAddressDto,
  ) {
    return this.addressService.addAddressToUser(addressDto, user.id);
  }

  @Put(SwaggerDescription.ID)
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une adresse',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: AddressDto,
  })
  @ApiCreatedResponse({
    type: AddressDto,
  })
  public async update(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() handgun: AddressDto,
  ): Promise<AddressDto> {
    return this.addressService.update(id, handgun);
  }
}
