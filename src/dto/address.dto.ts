import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
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
