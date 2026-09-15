import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { PhysicalEvaluationStage, Vo2TestMethod, } from '../entities/physical-evaluation.entity'

export class ResponsePhysicalEvaluationDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_eval: number

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
  @ApiProperty({ enum: PhysicalEvaluationStage })
  stage: PhysicalEvaluationStage

  @Expose()
  @ApiProperty({ example: 168.5 })
  height_cm: number

  @Expose()
  @ApiProperty({ example: 59.25 })
  weight_kg: number

  @Expose()
  @ApiPropertyOptional({ example: 47.3, nullable: true })
  vo2max_estimado?: number | null

  @Expose()
  @ApiPropertyOptional({ enum: Vo2TestMethod, nullable: true })
  test_method?: Vo2TestMethod | null

  @Expose()
  @ApiPropertyOptional({ example: 3.21, nullable: true })
  speed_20m?: number | null

  @Expose()
  @ApiProperty({ example: '2026-01-20', format: 'date' })
  eval_date: string

  @Expose()
  @ApiPropertyOptional({ example: 2, nullable: true })
  evaluator_id?: number | null

  @Expose()
  @Transform(({ obj }) =>
    obj.evaluator
      ? `${obj.evaluator.name ?? ''} ${obj.evaluator.lastname ?? ''}`.trim()
      : null,
  )
  @ApiPropertyOptional({ example: 'María Gómez', nullable: true })
  evaluator_name?: string | null

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
