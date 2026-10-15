export enum Sport {
  FUTBOL = 'futbol',
  FUTBOL_SALA = 'futbol_sala',
}

export interface SportRules {
  label: string
  matchMinutes: number
  maxMatchMinutes: number
  positions: string[]
}

export const SPORT_RULES: Record<Sport, SportRules> = {
  [Sport.FUTBOL]: {
    label: 'fútbol',
    matchMinutes: 90,
    maxMatchMinutes: 130,
    positions: [
      'Portero',
      'Defensa central',
      'Lateral',
      'Mediocampista defensivo',
      'Mediocampista',
      'Mediocampista ofensivo',
      'Extremo',
      'Delantero',
    ],
  },
  [Sport.FUTBOL_SALA]: {
    label: 'fútbol sala',
    matchMinutes: 40,
    maxMatchMinutes: 50,
    positions: [
      'Portero de fútbol sala',
      'Cierre',
      'Ala',
      'Pívot',
      'Universal',
    ],
  },
}

export function sportRules(sport: Sport | null | undefined): SportRules {
  return SPORT_RULES[sport ?? Sport.FUTBOL]
}

export function positionErrorFor(
  sport: Sport | null | undefined,
  position: string | null | undefined,
): string | null {
  if (!position) return null
  const rules = sportRules(sport)
  if (rules.positions.includes(position)) return null
  return `La posición "${position}" no corresponde a ${rules.label}. Usa una de estas: ${rules.positions.join(', ')}.`
}

export function minutesErrorFor(
  sport: Sport | null | undefined,
  minutes: number,
): string | null {
  const rules = sportRules(sport)
  if (minutes <= rules.maxMatchMinutes) return null
  return `En ${rules.label} un partido dura ${rules.matchMinutes} minutos; registra como máximo ${rules.maxMatchMinutes} minutos jugados.`
}
