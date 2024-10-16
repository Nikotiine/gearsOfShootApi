import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDto, UserCredentialDto, UserDto } from '../dto/user.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login',
    description: "Connexion a l'application",
  })
  @ApiBody({
    type: UserCredentialDto,
  })
  @ApiCreatedResponse({
    type: TokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  public async login(@Req() req: any): Promise<TokenDto> {
    return this.authService.generateToken(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Profil par token',
    description: 'Autentification du token et retour du profil',
  })
  @ApiOkResponse({
    type: UserDto,
  })
  public async me(@Req() req: any): Promise<UserDto> {
    return this.authService.getProfile(parseInt(req.user.id));
  }
}
