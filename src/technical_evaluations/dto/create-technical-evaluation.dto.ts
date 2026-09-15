import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator'

export class CreateTechnicalEvaluationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 7 })
  id_user: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  id_season: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  @ApiProperty({ example: 'control_balon' })
  indicator: string

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(10)
  @ApiProperty({ example: 8.5, minimum: 1, maximum: 10 })
  score: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 2 })
  evaluator_id: number

  @IsDateString()
  @ApiProperty({ example: '2026-01-22', format: 'date' })
  eval_date: string
}
