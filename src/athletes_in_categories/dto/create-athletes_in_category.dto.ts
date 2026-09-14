import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
}
