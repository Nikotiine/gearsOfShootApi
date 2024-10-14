import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from '../dto/user.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({
    summary: 'Creation de compte',
    description:
      'Point d entree pour creer un nouveau compte utilisateur (Client part defaut)',
  })
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiBody({
    type: CreateUserDto,
  })
  public async register(@Body() user: CreateUserDto): Promise<UserDto> {
    return await this.userService.insert(user);
  }
}
