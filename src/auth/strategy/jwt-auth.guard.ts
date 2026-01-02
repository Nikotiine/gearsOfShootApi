import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestContextService } from '../../request-context/request-context.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const req = context.switchToHttp().getRequest();

    // Ici, on stocke le userId directement dans le contexte
    RequestContextService.run({ userId: user.id }, () => {
      req.user = user;
    });

    return user;
  }
}
