import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Sport } from 'src/common/sport/sport-rules'
import { Type } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateTalentFlagDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Id del deportista señalado.', example: 7 })
  id_user: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Id de la temporada de referencia.', example: 1 })
  id_season: number

  @IsOptional()
  @IsEnum(Sport, { message: 'El deporte debe ser futbol o futbol_sala' })
  @ApiPropertyOptional({
    enum: Sport,
    description:
      'Deporte en el que se señala el potencial. Es obligatorio si el deportista juega fútbol y fútbol sala en la temporada.',
  })
  sport?: Sport

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Criterio(s) que motivan la señalización de talento.',
    example:
      'Índice de progreso ponderado en percentil 90 de su categoría, sin lesiones en la temporada',
  })
  criteria: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Acción recomendada para el deportista.',
    example: 'Evaluar para convocatoria a selección departamental sub-15',
  })
  recommended_action: string

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Id del usuario que registra la señalización.',
    example: 2,
  })
  created_by: number
}
