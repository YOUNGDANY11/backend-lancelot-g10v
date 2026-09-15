import { ForbiddenException } from '@nestjs/common'
import { User } from 'src/users/entities/user.entity'

export function isDeportista(user: User): boolean {
  return user.role?.name === 'DEPORTISTA'
}

export function assertOwnRecordOrStaff(user: User, id_user: number) {
  if (isDeportista(user) && user.id_user !== id_user)
    throw new ForbiddenException({
      status: 'Error',
      mensaje: 'Solo puedes consultar tu propia información',
    })
}
