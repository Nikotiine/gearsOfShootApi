import { Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDto, UserCredentialDto } from '../dto/user.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';

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
  async login(@Req() req: any): Promise<TokenDto> {
    return this.authService.generateToken(req.user);
  }
}
