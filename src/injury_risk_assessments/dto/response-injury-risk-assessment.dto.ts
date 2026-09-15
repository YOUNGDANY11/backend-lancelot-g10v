import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import {
  InjuryRiskAssessmentMethod,
  InjuryRiskAssessmentStatus,
  InjuryRiskLevel,
  InjuryRiskRuleCode,
} from '../entities/injury-risk-assessment.entity'

export class ResponseInjuryRiskAssessmentDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_assessment: number

  @Expose()
  @ApiProperty({ example: 7 })
  id_user: number

  @Expose()
  @Transform(({ obj }) =>
    `${obj.athlete?.name ?? ''} ${obj.athlete?.lastname ?? ''}`.trim(),
  )
  @ApiProperty({ example: 'Juan Pérez' })
  athlete_name: string

  @Expose()
  @ApiProperty({ example: '2026-03-02', format: 'date' })
  assessment_date: string

  @Expose()
  @ApiProperty({ enum: InjuryRiskAssessmentMethod })
  method: InjuryRiskAssessmentMethod

  @Expose()
  @ApiProperty({ enum: InjuryRiskLevel })
  risk_level: InjuryRiskLevel

  @Expose()
  @ApiProperty({ enum: InjuryRiskRuleCode, isArray: true })
  triggered_rules: InjuryRiskRuleCode[]

  @Expose()
  @ApiProperty({ example: 'ACWR > 1.5 durante 3 días consecutivos', required: false })
  details?: string | null

  @Expose()
  @ApiProperty({ example: 1.62, required: false })
  acwr_value?: number | null

  @Expose()
  @ApiProperty({ enum: InjuryRiskAssessmentStatus })
  status: InjuryRiskAssessmentStatus

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
