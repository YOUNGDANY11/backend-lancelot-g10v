import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { TrainingSessionType } from '../entities/training-session.entity'

export class ResponseTrainingSessionDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_session: number

  @Expose()
  @ApiProperty({ example: 1 })
  id_category: number

  @Expose()
  @Transform(({ obj }) => obj.category?.name)
  @ApiProperty({ example: 'Sub-15' })
  category_name: string

  @Expose()
  @ApiProperty({ example: 1 })
  id_season: number

  @Expose()
  @Transform(({ obj }) => obj.season?.name)
  @ApiProperty({ example: '2026-A' })
  season_name: string

  @Expose()
  @ApiProperty({ example: '2026-02-10', format: 'date' })
  date: string

  @Expose()
  @ApiProperty({ enum: TrainingSessionType })
  type: TrainingSessionType

  @Expose()
  @ApiProperty({ example: 90 })
  planned_duration_min: number

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
