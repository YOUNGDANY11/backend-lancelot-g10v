/**
 * Utilidades de fechas en formato YYYY-MM-DD (UTC), la convención del
 * proyecto (toISOString().slice(0, 10)).
 */
const MS_PER_DAY = 86_400_000

export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function parseDateKey(dateKey: string): Date {
  return new Date(`${dateKey.slice(0, 10)}T00:00:00Z`)
}

/** Fecha de una consulta raw (pg puede devolver Date o texto) como YYYY-MM-DD */
export function rawDateToKey(value: unknown): string | null {
  if (value instanceof Date) return toDateKey(value)
  if (typeof value === 'string' && value) return value.slice(0, 10)
  return null
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function addDaysToKey(dateKey: string, days: number): string {
  const date = parseDateKey(dateKey)
  date.setUTCDate(date.getUTCDate() + days)
  return toDateKey(date)
}

/** Días de `from` a `to` (positivo si `to` es posterior) */
export function daysBetween(from: string, to: string): number {
  return Math.round(
    (parseDateKey(to).getTime() - parseDateKey(from).getTime()) / MS_PER_DAY,
  )
}

/** Todas las fechas entre `from` y `to`, ambas incluidas */
export function enumerateDateKeys(from: string, to: string): string[] {
  const keys: string[] = []
  for (let key = from; key <= to; key = addDaysToKey(key, 1)) keys.push(key)
  return keys
}
