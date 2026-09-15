import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class FilterCategory {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ example: 1, minimum: 1, default: 1 })
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ example: 10, minimum: 1, default: 10 })
  limit?: number = 10

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Texto a buscar en el nombre.',
    example: 'Sub',
  })
  name?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiPropertyOptional({ example: 13 })
  min_age?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiPropertyOptional({ example: 15 })
  max_age?: number
}
