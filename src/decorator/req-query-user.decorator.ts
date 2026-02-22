import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRoles } from '../enum/user-roles.enum';

export interface QueryUser {
  email: string;
  id: number;
  role: UserRoles;
}

export const ReqQueryUser = createParamDecorator(
  (data: keyof any | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return null;

    // si on passe un champ -> @User('id')
    if (data) {
      return user[data];
    }

    // sinon -> @User()
    return user;
  },
);
