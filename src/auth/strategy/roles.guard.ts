import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../enum/user-roles.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Comparer le tableau de role requis par le decorateur @Roles() et le role du user
   * @param roles les roles requis
   * @param userRole le role de l'utlisateur
   * @private
   */
  private matchRoles(roles: UserRoles[], userRole: UserRoles): boolean {
    return roles.some((role) => role === userRole);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requireRoles) {
      return true;
    }
    return this.matchRoles(requireRoles, user.role);
  }
}
