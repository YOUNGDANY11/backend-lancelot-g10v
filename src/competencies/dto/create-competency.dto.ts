import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCompetencyDto {
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id de la categoria.',
    example: 23,
  })
  id_category: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la competencia.',
    example: 'Torneo regional',
  })
  name: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Descripción de la competencia.',
    example: 'Competencia regional anual.',
  })
  description?: string

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    description: 'Fecha de inicio en formato ISO 8601.',
    type: String,
    format: 'date-time',
    example: '2026-03-01T00:00:00.000Z',
  })
  start_date: Date

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional({
    description:
      'Fecha de finalización en formato ISO 8601. El servicio actual recibe la propiedad `finish`.',
    type: String,
    format: 'date-time',
    example: '2026-03-30T00:00:00.000Z',
  })
  finish?: Date

  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Id de la temporada a la que pertenece la competencia.',
    example: 1,
  })
  id_season?: number
}
