import { HttpException } from '@nestjs/common'

/**
 * Mensaje legible de un error: el `mensaje` de las excepciones HTTP de la API
 * ({ status: 'Error', mensaje }) o el message de cualquier otro error.
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof HttpException) {
    const response = error.getResponse()
    if (typeof response === 'object' && response !== null) {
      const { mensaje } = response as { mensaje?: unknown }
      if (typeof mensaje === 'string') return mensaje
    }
    return error.message
  }
  if (error instanceof Error) return error.message
  return String(error)
}
