import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateAthletesInCategoryDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    description: 'Identificador del usuario deportista.',
    example: 7,
    minimum: 1,
  })
  id_user: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    description: 'Identificador de la categoría.',
    example: 2,
    minimum: 1,
  })
  id_category: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiPropertyOptional({
    description: 'Identificador de la temporada.',
    example: 1,
  })
  id_season?: number

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @ApiPropertyOptional({
    description: 'Posición del deportista en esta asignación.',
    example: 'Delantero',
  })
  position?: string
}
