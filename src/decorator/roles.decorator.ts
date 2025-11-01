import { UserRoles } from '../enum/user-roles.enum';
import { SetMetadata } from '@nestjs/common';

/**
 * Decorateur personalisé en relation avec le RoleGuard permet de creer un guard suivant les roles autorisés
 * sur une requete http
 * @param roles UserRole.enum
 * @constructor
 */
export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
