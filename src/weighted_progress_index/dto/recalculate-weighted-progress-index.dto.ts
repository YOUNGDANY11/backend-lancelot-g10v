import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator'
import { Sport } from 'src/common/sport/sport-rules'

export class RecalculateWeightedProgressIndexDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: 'Id de la temporada para la que se recalcula el índice.',
    example: 1,
  })
  id_season: number

  @IsOptional()
  @IsEnum(Sport)
  @ApiPropertyOptional({
    enum: Sport,
    description:
      'Deporte a recalcular. Si se omite, se calcula un índice por cada deporte que el deportista juega en la temporada.',
  })
  sport?: Sport
}
