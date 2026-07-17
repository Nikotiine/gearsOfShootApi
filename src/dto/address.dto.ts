import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  additionalStreet: string;
  @ApiProperty()
  streetNumber: string;
  @ApiProperty()
  additionalInformation: string;
  @ApiProperty()
  zipCode: string;
}

export class AddressDto extends CreateAddressDto {
  @ApiProperty({})
  id: number;
}
