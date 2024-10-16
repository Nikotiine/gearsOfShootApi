import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

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
  address: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  zipCode: string;
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
  address: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  zipCode: string;
}
