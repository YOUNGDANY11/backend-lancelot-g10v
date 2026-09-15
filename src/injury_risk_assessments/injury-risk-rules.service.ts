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

export const SUSTAINED_ACWR_THRESHOLD = 1.5
export const SUSTAINED_ACWR_MIN_DAYS = 2
export const SUSTAINED_ACWR_LOOKBACK_DAYS = 7

export const SUSTAINED_RPE_THRESHOLD = 8
export const SUSTAINED_RPE_MIN_SESSIONS = 3
export const SUSTAINED_RPE_LOOKBACK_DAYS = 14

export interface InjuryRiskRulesInput {
  records: TrainingLoadRecord[]
  referenceDate: Date
  isRecoveringFromInjury: boolean
  acwrThresholds: AcwrThresholdsInput
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
  ): { triggered: boolean; streakDays: number } {
    const neutralThresholds: AcwrThresholdsInput = {
      low_min: 0,
      low_max: 0,
      medium_max: 0,
    }
    let streak = 0
    for (let i = 0; i < SUSTAINED_ACWR_LOOKBACK_DAYS; i++) {
      const day = this.addDays(this.toDateOnlyUTC(referenceDate), -i)
      const { acwr_value } = this.acwrCalculatorService.calculate(
        records,
        day,
        neutralThresholds,
      )
      if (acwr_value !== null && acwr_value > SUSTAINED_ACWR_THRESHOLD) streak++
      else break
    }
    return { triggered: streak >= SUSTAINED_ACWR_MIN_DAYS, streakDays: streak }
  }

  private checkSustainedHighRpe(
    records: TrainingLoadRecord[],
    referenceDate: Date,
  ): { triggered: boolean; sessionCount: number } {
    const refDay = this.toDateOnlyUTC(referenceDate)
    const windowStart = this.addDays(refDay, -(SUSTAINED_RPE_LOOKBACK_DAYS - 1))
    const sessionCount = records.filter((record) => {
      const day = this.toDateOnlyUTC(new Date(record.date))
      return (
        day >= windowStart &&
        day <= refDay &&
        record.rpe >= SUSTAINED_RPE_THRESHOLD
      )
    }).length
    return {
      triggered: sessionCount >= SUSTAINED_RPE_MIN_SESSIONS,
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
    const { records, referenceDate, isRecoveringFromInjury, acwrThresholds } =
      input

    const acwrCheck = this.checkSustainedAcwr(records, referenceDate)
    const rpeCheck = this.checkSustainedHighRpe(records, referenceDate)
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
        `ACWR > ${SUSTAINED_ACWR_THRESHOLD} durante ${acwrCheck.streakDays} días consecutivos`,
      )
    }
    if (rpeCheck.triggered) {
      triggeredRules.push(InjuryRiskRuleCode.SUSTAINED_HIGH_RPE)
      details.push(
        `${rpeCheck.sessionCount} sesiones con RPE >= ${SUSTAINED_RPE_THRESHOLD} en los últimos ${SUSTAINED_RPE_LOOKBACK_DAYS} días`,
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
