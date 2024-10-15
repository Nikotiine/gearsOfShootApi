import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TokenDto } from '../dto/user.dto';
import { User } from '../database/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { promisify } from 'util';
import { pbkdf2 as _pbkdf2 } from 'crypto';
import { CodeError } from '../enum/code-error.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * Generation du token de connexion a l'application
   * Payload defini avec l'email, l id et le role de l'utilisateur
   * @param user {User}
   */
  public async generateToken(user: User): Promise<TokenDto> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException(
        CodeError.BAD_CREDENTIAL,
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(),
        },
      );
    }

    if (!(await this.verifyPassword(user.password, password))) {
      throw new ForbiddenException(CodeError.BAD_CREDENTIAL);
    }
    return user;
  }

  private async verifyPassword(
    storedHash: string,
    password: string,
  ): Promise<boolean> {
    const pbkdf2 = promisify(_pbkdf2);
    const [salt, hash] = storedHash.split(':');
    const hashToVerify = await pbkdf2(password, salt, 10000, 64, 'sha512');
    return hash === hashToVerify.toString('hex');
  }
}
