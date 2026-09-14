import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import { SeasonStatus } from '../entities/season.entity'

export class FilterSeasonDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
  limit?: number = 10

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '2026' })
  name?: string

  @IsOptional()
  @IsEnum(SeasonStatus)
  @ApiPropertyOptional({ enum: SeasonStatus })
  status?: SeasonStatus

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2026-01-15', format: 'date' })
  start_date?: string
}
