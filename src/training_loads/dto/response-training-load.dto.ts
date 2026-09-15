import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'

export class ResponseTrainingLoadDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_load: number

  @Expose()
  @ApiProperty({ example: 1 })
  id_session: number

  @Expose()
  @Transform(({ obj }) => obj.session?.date)
  @ApiProperty({ example: '2026-02-10', format: 'date' })
  session_date: string

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
  @ApiProperty({ example: 7 })
  rpe: number

  @Expose()
  @ApiProperty({ example: 75 })
  duration_min: number

  @Expose()
  @ApiProperty({ example: 525 })
  session_load: number

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
