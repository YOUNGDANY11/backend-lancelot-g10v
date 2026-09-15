import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { HealthRecordStatus } from '../entities/health-record.entity'

export class ResponseHealthRecordDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_health: number

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
  @ApiProperty({ example: 'alergia' })
  condition_type: string

  @Expose()
  @ApiProperty({ example: 'Alergia a la penicilina' })
  description: string

  @Expose()
  @ApiProperty({ example: false })
  restriction: boolean

  @Expose()
  @ApiProperty({ enum: HealthRecordStatus })
  status: HealthRecordStatus

  @Expose()
  @ApiProperty({ example: 2 })
  registered_by: number

  @Expose()
  @Transform(({ obj }) =>
    `${obj.registeredByUser?.name ?? ''} ${obj.registeredByUser?.lastname ?? ''}`.trim(),
  )
  @ApiProperty({ example: 'María Gómez' })
  registered_by_name: string

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
