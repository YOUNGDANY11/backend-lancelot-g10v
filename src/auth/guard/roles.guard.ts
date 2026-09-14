import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private getRoleNameById(id_role: number): string | undefined {
    if (id_role === 1) {
      return 'ADMIN'
    }

    if (id_role === 2) {
      return 'ENTRENADOR'
    }

    if (id_role === 3) {
      return 'DEPORTISTA'
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requireRoles || requireRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user)
      throw new UnauthorizedException({
        status: 'Error',
        mensaje: 'No esta autorizado',
      })

    const roleName = user.role?.name ?? this.getRoleNameById(user.id_role)

    if (!roleName || !requireRoles.includes(roleName))
      throw new ForbiddenException({
        status: 'Error',
        mensaje: 'No tienes permisos para acceder',
      })

    return true
  }
}
