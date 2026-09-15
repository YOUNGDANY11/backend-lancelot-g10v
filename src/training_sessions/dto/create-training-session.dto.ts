import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsEnum, IsInt, Min } from 'class-validator'
import { TrainingSessionType } from '../entities/training-session.entity'

export class CreateTrainingSessionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  id_category: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  id_season: number

  @IsDateString()
  @ApiProperty({ example: '2026-02-10', format: 'date' })
  date: string

  @IsEnum(TrainingSessionType)
  @ApiProperty({ enum: TrainingSessionType, example: TrainingSessionType.MIXTO })
  type: TrainingSessionType

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 90 })
  planned_duration_min: number
}
