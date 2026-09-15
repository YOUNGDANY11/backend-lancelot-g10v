import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import {
  InjuryRiskAssessmentStatus,
} from '../entities/injury-risk-assessment.entity'

export class UpdateInjuryRiskAssessmentDto {
  @IsEnum(InjuryRiskAssessmentStatus)
  @ApiProperty({
    enum: InjuryRiskAssessmentStatus,
    example: InjuryRiskAssessmentStatus.REVIEWED,
  })
  status: InjuryRiskAssessmentStatus
}
