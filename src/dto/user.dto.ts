import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { UserRoles } from '../enum/user-roles.enum';
import { CostumerRoles } from '../enum/costumer-roles.enum';
import { AddressDto } from './address.dto';
import { ClientOrder } from '../database/entity/client-order.entity';
import { ClientOrderDto } from './client-order.dto';

export class UserCredentialDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
}
export class TokenDto {
  @ApiProperty()
  accessToken: string;
}
export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty({
    enum: UserRoles,
  })
  role: UserRoles;
}

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty({
    enum: UserRoles,
  })
  role: UserRoles;
  @ApiProperty({
    enum: CostumerRoles,
  })
  @IsOptional()
  costumerRoles?: CostumerRoles;
  @ApiProperty({
    type: [AddressDto],
  })
  addresses: AddressDto[];
  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  inCartId?: number;
}
