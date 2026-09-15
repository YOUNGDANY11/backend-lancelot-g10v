import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import {
  FatigueAlertLevel,
  FatigueAlertStatus,
} from '../entities/fatigue-alert.entity'

export class ResponseFatigueAlertDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_alert: number

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
  @ApiProperty({ example: '2026-03-02', format: 'date' })
  date: string

  @Expose()
  @ApiProperty({ example: 520.5 })
  acute_load: number

  @Expose()
  @ApiProperty({ example: 340.2 })
  chronic_load: number

  @Expose()
  @ApiProperty({ example: 1.53 })
  acwr_value: number

  @Expose()
  @ApiProperty({ example: 8.2 })
  rpe_avg: number

  @Expose()
  @ApiProperty({ enum: FatigueAlertLevel })
  level: FatigueAlertLevel

  @Expose()
  @ApiProperty({ enum: FatigueAlertStatus })
  status: FatigueAlertStatus

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
