import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { DevelopmentObjectiveStatus } from '../entities/development-objective.entity'

export class ResponseDevelopmentObjectiveDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_objective: number

  @Expose()
  @ApiProperty({ example: 7 })
  id_user: number

  @Expose()
  @Transform(({ obj }) =>
    `${obj.athlete?.name ?? ''} ${obj.athlete?.lastname ?? ''}`.trim(),
  )
  @ApiProperty({ example: 'Juan Pérez' })
  athlete_name: string

  @Expose()
  @ApiProperty({ example: 1 })
  id_season: number

  @Expose()
  @Transform(({ obj }) => obj.season?.name)
  @ApiProperty({ example: '2026-A' })
  season_name: string

  @Expose()
  @ApiProperty({ example: 'Mejorar la definición con pierna izquierda' })
  description: string

  @Expose()
  @ApiProperty({ example: '2026-06-30', format: 'date' })
  target_date: string

  @Expose()
  @ApiProperty({ enum: DevelopmentObjectiveStatus })
  status: DevelopmentObjectiveStatus

  @Expose()
  @ApiProperty({ example: 2 })
  set_by: number

  @Expose()
  @Transform(({ obj }) =>
    `${obj.setByUser?.name ?? ''} ${obj.setByUser?.lastname ?? ''}`.trim(),
  )
  @ApiProperty({ example: 'María Gómez' })
  set_by_name: string

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
