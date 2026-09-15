import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, Min, } from 'class-validator'
import { PhysicalEvaluationStage, Vo2TestMethod, } from '../entities/physical-evaluation.entity'

export class CreatePhysicalEvaluationDto {
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

  @IsEnum(PhysicalEvaluationStage)
  @ApiProperty({
    enum: PhysicalEvaluationStage,
    example: PhysicalEvaluationStage.PRE,
  })
  stage: PhysicalEvaluationStage

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @ApiProperty({ example: 168.5, minimum: 1 })
  height_cm: number

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @ApiProperty({ example: 59.25, minimum: 1 })
  weight_kg: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiPropertyOptional({ example: 47.3, minimum: 0 })
  vo2max_estimado?: number

  @IsOptional()
  @IsEnum(Vo2TestMethod)
  @ApiPropertyOptional({ enum: Vo2TestMethod, example: Vo2TestMethod.COOPER })
  test_method?: Vo2TestMethod

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @ApiPropertyOptional({ example: 3.21, minimum: 0.01 })
  speed_20m?: number

  @IsDateString()
  @ApiProperty({ example: '2026-01-20', format: 'date' })
  eval_date: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ example: 2 })
  evaluator_id?: number
}
