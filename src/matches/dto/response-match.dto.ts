import { Expose, Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class ResponseMatchDto {
  @Expose()
  @ApiProperty({ description: 'Identificador único del partido.', example: 12 })
  id_match: number

  @Expose()
  @ApiProperty({
    description: 'Identificador de la competencia asociada.',
    example: 1,
  })
  id_competency: number

  @Expose()
  @ApiProperty({
    description: 'Identificador de la categoría asociada.',
    example: 2,
  })
  id_category: number

  @Expose()
  @ApiProperty({
    description: 'Fecha programada del partido.',
    example: '2026-03-15',
    format: 'date',
  })
  date: string

  @Expose()
  @ApiProperty({
    description: 'Hora programada del partido.',
    example: '15:30:00',
    format: 'time',
  })
  time: string

  @Expose()
  @ApiProperty({
    description: 'Lugar del partido.',
    example: 'Estadio Cayetano Cañizares',
  })
  location: string

  @Expose()
  @Transform(({ obj }) => obj.category?.name)
  @ApiProperty({
    description: 'Nombre de la categoría asociada.',
    example: 'Sub-20',
  })
  name_category: string

  @Expose()
  @Transform(({ obj }) => obj.competency?.name)
  @ApiProperty({
    description: 'Nombre de la competencia asociada.',
    example: 'Liga de Bogotá',
  })
  name_competency: string

  @Expose()
  @ApiProperty({
    description: 'Fecha de creación del registro.',
    type: String,
    format: 'date-time',
    example: '2026-01-15T12:00:00.000Z',
  })
  created_at: Date

  @Expose()
  @ApiProperty({
    description: 'Fecha de última actualización del registro.',
    type: String,
    format: 'date-time',
    example: '2026-01-15T12:00:00.000Z',
  })
  updated_at: Date
}
