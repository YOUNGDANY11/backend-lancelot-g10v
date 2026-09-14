import { Expose, Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class ResponseAthInComp {
  @Expose()
  @ApiProperty({ example: 4 })
  id_ath_comp: number

  @Expose()
  @ApiProperty({ example: 7 })
  id_user: number

  @Expose()
  @ApiProperty({ example: 1 })
  id_competency: number

  @Expose()
  @Transform(({ obj }) => obj.user?.name)
  @ApiProperty({ example: 'Juan' })
  name: string

  @Expose()
  @Transform(({ obj }) => obj.user?.lastname)
  @ApiProperty({ example: 'Pérez' })
  lastname: string

  @Expose()
  @Transform(({ obj }) => obj.competency?.name)
  @ApiProperty({ example: 'Torneo regional' })
  name_competency: string

  @Expose()
  @Transform(({ obj }) => obj.competency?.current_year)
  @ApiProperty({ example: 2026 })
  current_year_competency: number

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
