import { ProgressIndexCalculatorService } from './progress-index-calculator.service'

describe('ProgressIndexCalculatorService', () => {
  let service: ProgressIndexCalculatorService

  beforeEach(() => {
    service = new ProgressIndexCalculatorService()
  })

  describe('computePercentile', () => {
    it('returns a neutral 50 when the cohort has 0 or 1 members (no real comparison possible)', () => {
      expect(service.computePercentile(10, [], true)).toBe(50)
      expect(service.computePercentile(10, [10], true)).toBe(50)
    })

    it('ranks higher-is-better metrics (e.g. VO2max) correctly', () => {
      const cohort = [30, 40, 50, 60] // athlete's own value (50) is included
      expect(service.computePercentile(50, cohort, true)).toBe(75) // beats/ties 3 of 4
      expect(service.computePercentile(60, cohort, true)).toBe(100)
      expect(service.computePercentile(30, cohort, true)).toBe(25)
    })

    it('ranks lower-is-better metrics (e.g. sprint time) correctly', () => {
      const cohort = [2.8, 3.0, 3.2, 3.4] // athlete's own value included
      expect(service.computePercentile(2.8, cohort, false)).toBe(100) // fastest
      expect(service.computePercentile(3.4, cohort, false)).toBe(25) // slowest
    })
  })

  describe('computePhysicalScore', () => {
    it('averages the vo2max and speed percentiles when both are available', () => {
      const result = service.computePhysicalScore({
        athleteVo2max: 50,
        cohortVo2max: [30, 40, 50, 60],
        athleteSpeed20m: 2.8,
        cohortSpeed20m: [2.8, 3.0, 3.2, 3.4],
      })
      // vo2max percentile = 75, speed percentile = 100 -> avg 87.5
      expect(result.score).toBe(87.5)
      expect(result.warnings).toEqual([])
    })

    it('uses only the available metric when one is missing', () => {
      const result = service.computePhysicalScore({
        athleteVo2max: null,
        cohortVo2max: [],
        athleteSpeed20m: 2.8,
        cohortSpeed20m: [2.8, 3.0, 3.2, 3.4],
      })
      expect(result.score).toBe(100)
      expect(result.warnings).toEqual([])
    })

    it('returns 0 with a warning when there is no physical evaluation data at all', () => {
      const result = service.computePhysicalScore({
        athleteVo2max: null,
        cohortVo2max: [],
        athleteSpeed20m: null,
        cohortSpeed20m: [],
      })
      expect(result.score).toBe(0)
      expect(result.warnings).toHaveLength(1)
    })
  })

  describe('computeTechnicalScore', () => {
    it('averages the 0-10 scores and scales them to 0-100', () => {
      const result = service.computeTechnicalScore([8, 7, 9])
      expect(result.score).toBe(80)
      expect(result.warnings).toEqual([])
    })

    it('returns 0 with a warning when there are no technical evaluations', () => {
      const result = service.computeTechnicalScore([])
      expect(result.score).toBe(0)
      expect(result.warnings).toHaveLength(1)
    })

    it('clamps an out-of-range average to 100', () => {
      const result = service.computeTechnicalScore([10, 10, 10])
      expect(result.score).toBe(100)
    })
  })

  describe('computeParticipationScore', () => {
    it('averages training attendance and match-minutes ratios when both exist', () => {
      const result = service.computeParticipationScore(0.8, 0.6)
      expect(result.score).toBe(70)
      expect(result.warnings).toEqual([])
    })

    it('uses only the available ratio when the other is null', () => {
      const result = service.computeParticipationScore(0.5, null)
      expect(result.score).toBe(50)
      expect(result.warnings).toEqual([])
    })

    it('returns 0 with a warning when there is no participation data at all', () => {
      const result = service.computeParticipationScore(null, null)
      expect(result.score).toBe(0)
      expect(result.warnings).toHaveLength(1)
    })
  })

  describe('computeIndex', () => {
    it('computes the weighted sum of the three components', () => {
      const index = service.computeIndex(80, 60, 40, {
        w_physical: 0.4,
        w_technical: 0.4,
        w_participation: 0.2,
      })
      // 80*0.4 + 60*0.4 + 40*0.2 = 32 + 24 + 8 = 64
      expect(index).toBe(64)
    })

    it('clamps the result to the 0-100 range', () => {
      const index = service.computeIndex(100, 100, 100, {
        w_physical: 0.5,
        w_technical: 0.5,
        w_participation: 0.5,
      })
      expect(index).toBe(100)
    })
  })
})
