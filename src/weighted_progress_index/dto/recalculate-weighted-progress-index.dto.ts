import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, Min } from 'class-validator'

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
}
