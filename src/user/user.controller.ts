import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from '../dto/user.dto';
import { Roles } from '../decorator/roles.decorator';
import { UserRoles } from '../enum/user-roles.enum';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { SwaggerDescription } from '../enum/swagger-description.enum';
import {
  ApiPaginatedResponse,
  PaginatedResponseDto,
} from '../decorator/paginated-response.decorator';
import { QueryFilter } from '../decorator/query-filter.decorator';
import { UserFilter } from './filters/users.filter';
import { ReqQueryFilter } from '../decorator/req-query-filter.decorator';

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

  @Get(SwaggerDescription.FIND_ALL)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiPaginatedResponse(UserDto)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_CATEGORY_SUMMARY,
    description: 'Retourne la liste des munitions filtre par calibre',
  })
  @QueryFilter(UserFilter)
  public async findAll(
    @ReqQueryFilter() filters: UserFilter,
  ): Promise<PaginatedResponseDto<UserDto>> {
    return this.userService.findAll(filters);
  }
}
