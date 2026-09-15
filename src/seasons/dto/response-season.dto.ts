import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { SeasonStatus } from '../entities/season.entity'

export class ResponseSeasonDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_season: number

  @Expose()
  @ApiProperty({ example: '2026-A' })
  name: string

  @Expose()
  @ApiProperty({ example: '2026-01-15', format: 'date' })
  start_date: string

  @Expose()
  @ApiPropertyOptional({
    example: '2026-06-30',
    format: 'date',
    nullable: true,
  })
  end_date?: string | null

  @Expose()
  @ApiProperty({ enum: SeasonStatus, example: SeasonStatus.ACTIVE })
  status: SeasonStatus

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
