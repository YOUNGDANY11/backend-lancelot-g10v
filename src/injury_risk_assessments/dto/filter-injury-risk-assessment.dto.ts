import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import {
  InjuryRiskAssessmentStatus,
  InjuryRiskLevel,
} from '../entities/injury-risk-assessment.entity'

export class FilterInjuryRiskAssessmentDto {
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
  @ApiPropertyOptional({ example: 7 })
  id_user?: number

  @IsOptional()
  @IsEnum(InjuryRiskLevel)
  @ApiPropertyOptional({ enum: InjuryRiskLevel })
  risk_level?: InjuryRiskLevel

  @IsOptional()
  @IsEnum(InjuryRiskAssessmentStatus)
  @ApiPropertyOptional({ enum: InjuryRiskAssessmentStatus })
  status?: InjuryRiskAssessmentStatus
}
