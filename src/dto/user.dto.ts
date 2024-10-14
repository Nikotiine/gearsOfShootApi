import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column } from 'typeorm';

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
}

export class UserDto {
  @ApiProperty()
  id: number;
}
