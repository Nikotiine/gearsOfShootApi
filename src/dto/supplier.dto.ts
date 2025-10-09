import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  zipCode: string;
  @ApiProperty()
  siret: string;
}

export class UpdateSupplierDto extends CreateSupplierDto {
  @ApiProperty()
  id: number;
}

export class SupplierDto extends UpdateSupplierDto {}
