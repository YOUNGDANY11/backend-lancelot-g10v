/**
 * Porcentaje (0-100, 2 decimales) o null si el denominador es 0: nunca se
 * divide entre cero ni se inventa un valor cuando no hay datos.
 */
export function percentage(
  numerator: number,
  denominator: number,
): number | null {
  if (!denominator) return null
  return Math.round((numerator / denominator) * 10000) / 100
}
