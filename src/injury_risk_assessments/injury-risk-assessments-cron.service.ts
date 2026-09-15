import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AcwrConfigService } from 'src/acwr_config/acwr-config.service'
import { CHRONIC_WINDOW_DAYS } from 'src/fatigue_alerts/acwr-calculator.service'
import { InjuryRiskRuleConfig } from 'src/injury_risk_rule_config/entities/injury-risk-rule-config.entity'
import { InjuryRiskRuleConfigService } from 'src/injury_risk_rule_config/injury-risk-rule-config.service'
import { TrainingLoad } from 'src/training_loads/entities/training-load.entity'
import { Injury, InjuryStatus } from 'src/injuries/entities/injury.entity'
import { UsersService } from 'src/users/users.service'
import {
  InjuryRiskAssessment,
  InjuryRiskAssessmentMethod,
} from './entities/injury-risk-assessment.entity'
import { InjuryRiskRulesService } from './injury-risk-rules.service'

@Injectable()
export class InjuryRiskAssessmentsCronService {
  private readonly logger = new Logger(InjuryRiskAssessmentsCronService.name)

  constructor(
    @InjectRepository(TrainingLoad)
    private readonly trainingLoadsRepository: Repository<TrainingLoad>,
    @InjectRepository(Injury)
    private readonly injuriesRepository: Repository<Injury>,
    @InjectRepository(InjuryRiskAssessment)
    private readonly injuryRiskAssessmentsRepository: Repository<InjuryRiskAssessment>,
    private readonly usersService: UsersService,
    private readonly acwrConfigService: AcwrConfigService,
    private readonly injuryRiskRuleConfigService: InjuryRiskRuleConfigService,
    private readonly injuryRiskRulesService: InjuryRiskRulesService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async recalculateInjuryRiskAssessments() {
    const referenceDate = new Date()
    const athleteIds = await this.usersService.findAllAthleteIds()
    const acwrThresholds = await this.acwrConfigService.getActive()
    const ruleThresholds = await this.injuryRiskRuleConfigService.getActive()

    for (const id_user of athleteIds) {
      await this.processAthlete(
        id_user,
        referenceDate,
        acwrThresholds,
        ruleThresholds,
      )
    }

    this.logger.log(
      `Recalculo de riesgo de lesión completado para ${athleteIds.length} deportistas`,
    )
  }

  private async processAthlete(
    id_user: number,
    referenceDate: Date,
    acwrThresholds: { low_min: number; low_max: number; medium_max: number },
    ruleThresholds: InjuryRiskRuleConfig,
  ) {
    const lookbackDays =
      CHRONIC_WINDOW_DAYS +
      Math.max(
        Number(ruleThresholds.sustained_acwr_lookback_days),
        Number(ruleThresholds.sustained_rpe_lookback_days),
      ) -
      1

    const windowStart = new Date(referenceDate)
    windowStart.setUTCDate(windowStart.getUTCDate() - (lookbackDays - 1))

    const loads = await this.trainingLoadsRepository
      .createQueryBuilder('load')
      .innerJoinAndSelect('load.session', 'session')
      .where('load.id_user = :id_user', { id_user })
      .andWhere('session.date >= :windowStart', {
        windowStart: windowStart.toISOString().slice(0, 10),
      })
      .andWhere('session.date <= :referenceDate', {
        referenceDate: referenceDate.toISOString().slice(0, 10),
      })
      .getMany()

    const records = loads.map((load) => ({
      date: load.session.date,
      rpe: load.rpe,
      duration_min: load.duration_min,
    }))

    const isRecoveringFromInjury =
      (await this.injuriesRepository.count({
        where: { id_user, status: InjuryStatus.RECOVERING },
      })) > 0

    const result = this.injuryRiskRulesService.evaluate({
      records,
      referenceDate,
      isRecoveringFromInjury,
      acwrThresholds: {
        low_min: Number(acwrThresholds.low_min),
        low_max: Number(acwrThresholds.low_max),
        medium_max: Number(acwrThresholds.medium_max),
      },
      ruleThresholds: {
        sustained_acwr_threshold: Number(ruleThresholds.sustained_acwr_threshold),
        sustained_acwr_min_days: Number(ruleThresholds.sustained_acwr_min_days),
        sustained_acwr_lookback_days: Number(
          ruleThresholds.sustained_acwr_lookback_days,
        ),
        sustained_rpe_threshold: Number(ruleThresholds.sustained_rpe_threshold),
        sustained_rpe_min_sessions: Number(
          ruleThresholds.sustained_rpe_min_sessions,
        ),
        sustained_rpe_lookback_days: Number(
          ruleThresholds.sustained_rpe_lookback_days,
        ),
      },
    })

    if (result.triggeredRules.length === 0 || !result.riskLevel) return

    const dateKey = referenceDate.toISOString().slice(0, 10)
    const alreadyExists = await this.injuryRiskAssessmentsRepository.findOne({
      where: { id_user, assessment_date: dateKey },
    })
    if (alreadyExists) return

    await this.injuryRiskAssessmentsRepository.save({
      id_user,
      assessment_date: dateKey,
      method: InjuryRiskAssessmentMethod.RULES,
      risk_level: result.riskLevel,
      triggered_rules: result.triggeredRules,
      details: result.details.join('; '),
      acwr_value: result.acwrValue,
    })
  }
}
