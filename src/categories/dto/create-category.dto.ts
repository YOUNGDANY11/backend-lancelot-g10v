import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
}
