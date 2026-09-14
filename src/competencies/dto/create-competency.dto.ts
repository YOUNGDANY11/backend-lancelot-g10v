import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCompetencyDto {
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

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: 'Año de vigencia.', example: 2026 })
  current_year: number
}
