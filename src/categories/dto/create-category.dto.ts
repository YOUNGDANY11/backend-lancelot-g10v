import { Type } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Sport } from 'src/common/sport/sport-rules'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre de la categoría.', example: 'Sub-15' })
  name: string

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({ description: 'Edad mínima permitida.', example: 13 })
  min_age: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({ description: 'Edad máxima permitida.', example: 15 })
  max_age: number

  @IsOptional()
  @IsEnum(Sport, { message: 'El deporte debe ser futbol o futbol_sala' })
  @ApiPropertyOptional({
    enum: Sport,
    default: Sport.FUTBOL,
    description:
      'Deporte de la categoría. Define las posiciones válidas, la duración del partido y las estadísticas que se registran.',
  })
  sport?: Sport
}
