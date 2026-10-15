import { BadRequestException } from '@nestjs/common'
import { resolveAthleteSport } from './athlete-sports'
import { Sport } from './sport-rules'

describe('resolveAthleteSport', () => {
  it('uses the only sport the athlete plays when none is given', () => {
    expect(resolveAthleteSport([Sport.FUTBOL_SALA], undefined)).toBe(
      Sport.FUTBOL_SALA,
    )
    expect(resolveAthleteSport([], undefined)).toBeNull()
  })

  it('asks for the sport when the athlete plays both', () => {
    expect(() =>
      resolveAthleteSport([Sport.FUTBOL, Sport.FUTBOL_SALA], undefined),
    ).toThrow(BadRequestException)
    expect(
      resolveAthleteSport([Sport.FUTBOL, Sport.FUTBOL_SALA], Sport.FUTBOL),
    ).toBe(Sport.FUTBOL)
  })

  it('rejects a sport the athlete does not play that season', () => {
    const attempt = () => resolveAthleteSport([Sport.FUTBOL], Sport.FUTBOL_SALA)
    expect(attempt).toThrow(BadRequestException)
    try {
      attempt()
    } catch (error) {
      expect((error as BadRequestException).getResponse()).toMatchObject({
        mensaje: 'El deportista no juega fútbol sala en esta temporada.',
      })
    }
  })
})
