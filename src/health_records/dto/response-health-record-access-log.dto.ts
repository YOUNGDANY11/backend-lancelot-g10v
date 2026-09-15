import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { HealthRecordAccessAction } from '../entities/health-record-access-log.entity'

export class ResponseHealthRecordAccessLogDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_log: number

  @Expose()
  @ApiPropertyOptional({ example: 5, nullable: true })
  id_health?: number | null

  @Expose()
  @ApiProperty({ example: 2 })
  accessed_by: number

  @Expose()
  @Transform(({ obj }) =>
    `${obj.accessedByUser?.name ?? ''} ${obj.accessedByUser?.lastname ?? ''}`.trim(),
  )
  @ApiProperty({ example: 'María Gómez' })
  accessed_by_name: string

  @Expose()
  @ApiProperty({ enum: HealthRecordAccessAction })
  action: HealthRecordAccessAction

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  accessed_at: Date
}
