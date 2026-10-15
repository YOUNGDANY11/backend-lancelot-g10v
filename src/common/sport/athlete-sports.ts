import { BadRequestException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Sport, sportRules } from './sport-rules'

export async function sportsOfAthleteSeason(
  manager: EntityManager,
  id_user: number,
  id_season: number,
): Promise<Sport[]> {
  const rows: { sport: Sport }[] = await manager.query(
    `SELECT DISTINCT category.sport FROM athletes_in_categories assignment
     JOIN categories category ON category.id_category = assignment.id_category
     WHERE assignment.id_user = $1 AND assignment.id_season = $2
     ORDER BY category.sport`,
    [id_user, id_season],
  )
  return rows.map((row) => row.sport)
}

export function resolveAthleteSport(
  sports: Sport[],
  requested: Sport | null | undefined,
): Sport | null {
  if (requested) {
    if (sports.length > 0 && !sports.includes(requested))
      throw new BadRequestException({
        status: 'Error',
        mensaje: `El deportista no juega ${sportRules(requested).label} en esta temporada.`,
      })
    return requested
  }
  if (sports.length > 1)
    throw new BadRequestException({
      status: 'Error',
      mensaje:
        'Indica el deporte: el deportista juega fútbol y fútbol sala en esta temporada.',
    })
  return sports[0] ?? null
}
