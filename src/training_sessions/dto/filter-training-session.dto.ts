import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { TrainingSessionType } from '../entities/training-session.entity'

export class FilterTrainingSessionDto {
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
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ example: 1 })
  id_category?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ example: 1 })
  id_season?: number

  @IsOptional()
  @IsEnum(TrainingSessionType)
  @ApiPropertyOptional({ enum: TrainingSessionType })
  type?: TrainingSessionType

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2026-02-10', format: 'date' })
  date?: string
}
