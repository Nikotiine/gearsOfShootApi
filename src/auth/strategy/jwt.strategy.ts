import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtSecretKeyConfig from './jwtSecretKey.config';
import { AuthService } from '../auth.service';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: jwtSecretKeyConfig().jwtSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: any) {
    return {
      email: payload.email,
      id: payload.sub,
      role: payload.role,
    };
  }
}
