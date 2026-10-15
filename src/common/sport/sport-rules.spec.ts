import {
  minutesErrorFor,
  positionErrorFor,
  Sport,
  sportRules,
} from './sport-rules'

describe('sport rules', () => {
  it('uses the official match length of each sport', () => {
    expect(sportRules(Sport.FUTBOL).matchMinutes).toBe(90)
    expect(sportRules(Sport.FUTBOL_SALA).matchMinutes).toBe(40)
    expect(sportRules(undefined).matchMinutes).toBe(90)
  })

  it('accepts only the positions of the category sport', () => {
    expect(positionErrorFor(Sport.FUTBOL_SALA, 'Pívot')).toBeNull()
    expect(positionErrorFor(Sport.FUTBOL, null)).toBeNull()
    expect(positionErrorFor(Sport.FUTBOL, 'Pívot')).toBe(
      'La posición "Pívot" no corresponde a fútbol. Usa una de estas: Portero, Defensa central, Lateral, Mediocampista defensivo, Mediocampista, Mediocampista ofensivo, Extremo, Delantero.',
    )
  })

  it('limits the minutes played to the length of the sport', () => {
    expect(minutesErrorFor(Sport.FUTBOL, 95)).toBeNull()
    expect(minutesErrorFor(Sport.FUTBOL_SALA, 40)).toBeNull()
    expect(minutesErrorFor(Sport.FUTBOL_SALA, 60)).toBe(
      'En fútbol sala un partido dura 40 minutos; registra como máximo 50 minutos jugados.',
    )
  })
})
