import { Expose, Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class ResponseAthInCat {
  @Expose()
  @ApiProperty({ example: 7 })
  id_user: number

  @Expose()
  @ApiProperty({ example: 4 })
  id_ath_cat: number

  @Expose()
  @Transform(({ obj }) => obj.category?.id_category)
  @ApiProperty({ example: 2 })
  id_category: number

  @Expose()
  @Transform(({ obj }) => obj.category?.name)
  @ApiProperty({ example: 'Sub-15' })
  category_name: string

  @Expose()
  @Transform(({ obj }) => obj.user?.name)
  @ApiProperty({ example: 'Juan' })
  name: string

  @Expose()
  @Transform(({ obj }) => obj.user?.lastname)
  @ApiProperty({ example: 'Pérez' })
  lastname: string

  @Expose()
  @ApiProperty({ example: 1, nullable: true })
  id_season?: number | null

  @Expose()
  @ApiProperty({ example: 'Delantero', nullable: true })
  position?: string | null

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
