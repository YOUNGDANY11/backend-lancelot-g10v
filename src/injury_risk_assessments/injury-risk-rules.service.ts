import { Injectable } from '@nestjs/common'
import {
  AcwrCalculatorService,
  AcwrThresholdsInput,
  TrainingLoadRecord,
} from 'src/fatigue_alerts/acwr-calculator.service'
import { FatigueAlertLevel } from 'src/fatigue_alerts/entities/fatigue-alert.entity'
import {
  InjuryRiskLevel,
  InjuryRiskRuleCode,
} from './entities/injury-risk-assessment.entity'

export interface InjuryRiskRuleThresholds {
  sustained_acwr_threshold: number
  sustained_acwr_min_days: number
  sustained_acwr_lookback_days: number
  sustained_rpe_threshold: number
  sustained_rpe_min_sessions: number
  sustained_rpe_lookback_days: number
}

export const DEFAULT_INJURY_RISK_RULE_THRESHOLDS: InjuryRiskRuleThresholds = {
  sustained_acwr_threshold: 1.5,
  sustained_acwr_min_days: 2,
  sustained_acwr_lookback_days: 7,
  sustained_rpe_threshold: 8,
  sustained_rpe_min_sessions: 3,
  sustained_rpe_lookback_days: 14,
}

export interface InjuryRiskRulesInput {
  records: TrainingLoadRecord[]
  referenceDate: Date
  isRecoveringFromInjury: boolean
  acwrThresholds: AcwrThresholdsInput
  ruleThresholds: InjuryRiskRuleThresholds
}

export interface InjuryRiskRulesResult {
  triggeredRules: InjuryRiskRuleCode[]
  riskLevel: InjuryRiskLevel | null
  details: string[]
  acwrValue: number | null
}

@Injectable()
export class InjuryRiskRulesService {
  constructor(private readonly acwrCalculatorService: AcwrCalculatorService) {}

  private toDateOnlyUTC(date: Date): Date {
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    )
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setUTCDate(result.getUTCDate() + days)
    return result
  }

  private checkSustainedAcwr(
    records: TrainingLoadRecord[],
    referenceDate: Date,
    ruleThresholds: InjuryRiskRuleThresholds,
  ): { triggered: boolean; streakDays: number } {
    const neutralThresholds: AcwrThresholdsInput = {
      low_min: 0,
      low_max: 0,
      medium_max: 0,
    }
    let streak = 0
    for (let i = 0; i < ruleThresholds.sustained_acwr_lookback_days; i++) {
      const day = this.addDays(this.toDateOnlyUTC(referenceDate), -i)
      const { acwr_value } = this.acwrCalculatorService.calculate(
        records,
        day,
        neutralThresholds,
      )
      if (
        acwr_value !== null &&
        acwr_value > ruleThresholds.sustained_acwr_threshold
      )
        streak++
      else break
    }
    return {
      triggered: streak >= ruleThresholds.sustained_acwr_min_days,
      streakDays: streak,
    }
  }

  private checkSustainedHighRpe(
    records: TrainingLoadRecord[],
    referenceDate: Date,
    ruleThresholds: InjuryRiskRuleThresholds,
  ): { triggered: boolean; sessionCount: number } {
    const refDay = this.toDateOnlyUTC(referenceDate)
    const windowStart = this.addDays(
      refDay,
      -(ruleThresholds.sustained_rpe_lookback_days - 1),
    )
    const sessionCount = records.filter((record) => {
      const day = this.toDateOnlyUTC(new Date(record.date))
      return (
        day >= windowStart &&
        day <= refDay &&
        record.rpe >= ruleThresholds.sustained_rpe_threshold
      )
    }).length
    return {
      triggered: sessionCount >= ruleThresholds.sustained_rpe_min_sessions,
      sessionCount,
    }
  }

  private checkRelapse(
    isRecoveringFromInjury: boolean,
    todayLevel: FatigueAlertLevel | null,
  ): boolean {
    return isRecoveringFromInjury && todayLevel === FatigueAlertLevel.ALTO
  }

  evaluate(input: InjuryRiskRulesInput): InjuryRiskRulesResult {
    const {
      records,
      referenceDate,
      isRecoveringFromInjury,
      acwrThresholds,
      ruleThresholds,
    } = input

    const acwrCheck = this.checkSustainedAcwr(
      records,
      referenceDate,
      ruleThresholds,
    )
    const rpeCheck = this.checkSustainedHighRpe(
      records,
      referenceDate,
      ruleThresholds,
    )
    const today = this.acwrCalculatorService.calculate(
      records,
      referenceDate,
      acwrThresholds,
    )
    const relapseTriggered = this.checkRelapse(
      isRecoveringFromInjury,
      today.level,
    )

    const triggeredRules: InjuryRiskRuleCode[] = []
    const details: string[] = []

    if (acwrCheck.triggered) {
      triggeredRules.push(InjuryRiskRuleCode.SUSTAINED_ACWR)
      details.push(
        `ACWR > ${ruleThresholds.sustained_acwr_threshold} durante ${acwrCheck.streakDays} días consecutivos`,
      )
    }
    if (rpeCheck.triggered) {
      triggeredRules.push(InjuryRiskRuleCode.SUSTAINED_HIGH_RPE)
      details.push(
        `${rpeCheck.sessionCount} sesiones con RPE >= ${ruleThresholds.sustained_rpe_threshold} en los últimos ${ruleThresholds.sustained_rpe_lookback_days} días`,
      )
    }
    if (relapseTriggered) {
      triggeredRules.push(InjuryRiskRuleCode.RELAPSE)
      details.push('Lesión en recuperación con ACWR clasificado como alto')
    }

    let riskLevel: InjuryRiskLevel | null = null
    if (triggeredRules.length >= 2) riskLevel = InjuryRiskLevel.ALTO
    else if (triggeredRules.length === 1) riskLevel = InjuryRiskLevel.MEDIO

    return {
      triggeredRules,
      riskLevel,
      details,
      acwrValue: today.acwr_value,
    }
  }
}
