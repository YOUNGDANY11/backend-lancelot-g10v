import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { TalentFlagStatus } from '../entities/talent-flag.entity'

export class ResponseTalentFlagDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_flag: number

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
  @ApiProperty({ example: 'Índice de progreso en percentil 90 de su categoría' })
  criteria: string

  @Expose()
  @ApiProperty({ example: 'Evaluar para convocatoria a selección departamental' })
  recommended_action: string

  @Expose()
  @ApiProperty({ enum: TalentFlagStatus })
  status: TalentFlagStatus

  @Expose()
  @ApiProperty({ example: 2 })
  created_by: number

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
