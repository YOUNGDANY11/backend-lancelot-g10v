import { AcwrCalculatorService } from 'src/fatigue_alerts/acwr-calculator.service'
import {
  InjuryRiskLevel,
  InjuryRiskRuleCode,
} from './entities/injury-risk-assessment.entity'
import { InjuryRiskRulesService } from './injury-risk-rules.service'

const THRESHOLDS = { low_min: 0.8, low_max: 1.3, medium_max: 1.5 }

function offsetDate(base: Date, daysBack: number): string {
  const day = new Date(
    Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate()),
  )
  day.setUTCDate(day.getUTCDate() - daysBack)
  return day.toISOString().slice(0, 10)
}

describe('InjuryRiskRulesService', () => {
  let service: InjuryRiskRulesService
  const referenceDate = new Date('2026-03-28T12:00:00Z')

  beforeEach(() => {
    service = new InjuryRiskRulesService(new AcwrCalculatorService())
  })

  describe('sustained ACWR rule (> 1.5 for 2+ consecutive days)', () => {
    it('triggers when today and yesterday both exceed the threshold', () => {
      const records = [
        { date: offsetDate(referenceDate, 0), rpe: 10, duration_min: 100 },
        { date: offsetDate(referenceDate, 1), rpe: 10, duration_min: 100 },
      ]
      const result = service.evaluate({
        records,
        referenceDate,
        isRecoveringFromInjury: false,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toContain(InjuryRiskRuleCode.SUSTAINED_ACWR)
      expect(result.riskLevel).toBe(InjuryRiskLevel.MEDIO)
    })

    it('does NOT trigger when only today exceeds the threshold (no 2-day streak)', () => {
      const records = [
        { date: offsetDate(referenceDate, 0), rpe: 10, duration_min: 100 },
      ]
      const result = service.evaluate({
        records,
        referenceDate,
        isRecoveringFromInjury: false,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).not.toContain(
        InjuryRiskRuleCode.SUSTAINED_ACWR,
      )
    })
  })

  describe('sustained high RPE rule (3+ sessions with RPE >= 8 in 14 days)', () => {
    // Flat chronic baseline (ratio ~1, safely under 1.5) so these tests isolate
    // the RPE rule instead of accidentally tripping the sparse-data ACWR rule.
    function steadyBaseline() {
      const records: { date: string; rpe: number; duration_min: number }[] = []
      for (let daysBack = 27; daysBack >= 0; daysBack--) {
        records.push({
          date: offsetDate(referenceDate, daysBack),
          rpe: 5,
          duration_min: 40,
        })
      }
      return records
    }

    it('triggers with 3 qualifying sessions within the lookback window', () => {
      const records = [
        ...steadyBaseline(),
        { date: offsetDate(referenceDate, 1), rpe: 8, duration_min: 10 },
        { date: offsetDate(referenceDate, 5), rpe: 8, duration_min: 10 },
        { date: offsetDate(referenceDate, 10), rpe: 8, duration_min: 10 },
      ]
      const result = service.evaluate({
        records,
        referenceDate,
        isRecoveringFromInjury: false,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toEqual([
        InjuryRiskRuleCode.SUSTAINED_HIGH_RPE,
      ])
      expect(result.riskLevel).toBe(InjuryRiskLevel.MEDIO)
    })

    it('does NOT trigger with only 2 qualifying sessions', () => {
      const records = [
        ...steadyBaseline(),
        { date: offsetDate(referenceDate, 1), rpe: 8, duration_min: 10 },
        { date: offsetDate(referenceDate, 5), rpe: 8, duration_min: 10 },
      ]
      const result = service.evaluate({
        records,
        referenceDate,
        isRecoveringFromInjury: false,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toEqual([])
      expect(result.riskLevel).toBeNull()
    })

    it('ignores sessions with RPE below the threshold', () => {
      const records = [
        ...steadyBaseline(),
        { date: offsetDate(referenceDate, 1), rpe: 7, duration_min: 1 },
        { date: offsetDate(referenceDate, 5), rpe: 7, duration_min: 1 },
        { date: offsetDate(referenceDate, 10), rpe: 7, duration_min: 1 },
      ]
      const result = service.evaluate({
        records,
        referenceDate,
        isRecoveringFromInjury: false,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toEqual([])
    })
  })

  describe('relapse rule (recovering injury + high ACWR today)', () => {
    const spikeRecords = [
      { date: offsetDate(referenceDate, 0), rpe: 10, duration_min: 100 },
    ]

    it('triggers when the athlete is recovering and today is classified as alto', () => {
      const result = service.evaluate({
        records: spikeRecords,
        referenceDate,
        isRecoveringFromInjury: true,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toEqual([InjuryRiskRuleCode.RELAPSE])
      expect(result.riskLevel).toBe(InjuryRiskLevel.MEDIO)
    })

    it('does NOT trigger when the athlete is not recovering from an injury', () => {
      const result = service.evaluate({
        records: spikeRecords,
        referenceDate,
        isRecoveringFromInjury: false,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toEqual([])
      expect(result.riskLevel).toBeNull()
    })
  })

  describe('risk level aggregation', () => {
    it('returns alto when two or more rules trigger simultaneously', () => {
      const records = [
        { date: offsetDate(referenceDate, 0), rpe: 10, duration_min: 100 },
        { date: offsetDate(referenceDate, 1), rpe: 10, duration_min: 100 },
      ]
      const result = service.evaluate({
        records,
        referenceDate,
        isRecoveringFromInjury: true,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toEqual(
        expect.arrayContaining([
          InjuryRiskRuleCode.SUSTAINED_ACWR,
          InjuryRiskRuleCode.RELAPSE,
        ]),
      )
      expect(result.triggeredRules).toHaveLength(2)
      expect(result.riskLevel).toBe(InjuryRiskLevel.ALTO)
    })

    it('returns null with an empty triggeredRules array when no rule fires', () => {
      const result = service.evaluate({
        records: [],
        referenceDate,
        isRecoveringFromInjury: false,
        acwrThresholds: THRESHOLDS,
      })
      expect(result.triggeredRules).toEqual([])
      expect(result.riskLevel).toBeNull()
    })
  })
})
