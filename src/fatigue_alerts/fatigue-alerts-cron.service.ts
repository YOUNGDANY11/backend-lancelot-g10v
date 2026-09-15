import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AcwrConfigService } from 'src/acwr_config/acwr-config.service'
import { TrainingLoad } from 'src/training_loads/entities/training-load.entity'
import { UsersService } from 'src/users/users.service'
import {
  AcwrCalculatorService,
  CHRONIC_WINDOW_DAYS,
} from './acwr-calculator.service'
import {
  FatigueAlert,
  FatigueAlertLevel,
} from './entities/fatigue-alert.entity'

@Injectable()
export class FatigueAlertsCronService {
  private readonly logger = new Logger(FatigueAlertsCronService.name)

  constructor(
    @InjectRepository(TrainingLoad)
    private readonly trainingLoadsRepository: Repository<TrainingLoad>,
    @InjectRepository(FatigueAlert)
    private readonly fatigueAlertsRepository: Repository<FatigueAlert>,
    private readonly usersService: UsersService,
    private readonly acwrConfigService: AcwrConfigService,
    private readonly acwrCalculatorService: AcwrCalculatorService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async recalculateFatigueAlerts() {
    const referenceDate = new Date()
    const athleteIds = await this.usersService.findAllAthleteIds()
    const thresholds = await this.acwrConfigService.getActive()

    for (const id_user of athleteIds) {
      await this.processAthlete(id_user, referenceDate, thresholds)
    }

    this.logger.log(
      `Recalculo de ACWR/fatiga completado para ${athleteIds.length} deportistas`,
    )
  }

  private async processAthlete(
    id_user: number,
    referenceDate: Date,
    thresholds: { low_min: number; low_max: number; medium_max: number },
  ) {
    const windowStart = new Date(referenceDate)
    windowStart.setUTCDate(windowStart.getUTCDate() - (CHRONIC_WINDOW_DAYS - 1))

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

    const result = this.acwrCalculatorService.calculate(
      records,
      referenceDate,
      {
        low_min: Number(thresholds.low_min),
        low_max: Number(thresholds.low_max),
        medium_max: Number(thresholds.medium_max),
      },
    )

    if (
      !result.level ||
      result.level === FatigueAlertLevel.BAJO ||
      result.acwr_value === null
    )
      return

    const dateKey = referenceDate.toISOString().slice(0, 10)
    const alreadyExists = await this.fatigueAlertsRepository.findOne({
      where: { id_user, date: dateKey },
    })
    if (alreadyExists) return

    await this.fatigueAlertsRepository.save({
      id_user,
      date: dateKey,
      acute_load: result.acute_load,
      chronic_load: result.chronic_load,
      acwr_value: result.acwr_value,
      rpe_avg: result.rpe_avg,
      level: result.level,
    })
  }
}
