export const RoleCode = {
  ADMIN: 'ADMIN',
  ENTRENADOR: 'ENTRENADOR',
  DEPORTISTA: 'DEPORTISTA',
  DIRECTOR_TECNICO: 'DIRECTOR_TECNICO',
  ENCARGADO_SALUD: 'ENCARGADO_SALUD',
} as const

export type RoleCode = (typeof RoleCode)[keyof typeof RoleCode]
