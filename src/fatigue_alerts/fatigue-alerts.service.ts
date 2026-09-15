import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { FilterFatigueAlertDto } from './dto/filter-fatigue-alert.dto'
import { ResponseFatigueAlertDto } from './dto/response-fatigue-alert.dto'
import { UpdateFatigueAlertDto } from './dto/update-fatigue-alert.dto'
import { FatigueAlert } from './entities/fatigue-alert.entity'

@Injectable()
export class FatigueAlertsService {
  constructor(
    @InjectRepository(FatigueAlert)
    private readonly fatigueAlertsRepository: Repository<FatigueAlert>,
  ) {}

  async findOneById(id_alert: number) {
    return this.fatigueAlertsRepository.findOne({
      where: { id_alert },
      relations: { athlete: true },
    })
  }

  async findAll(filters: FilterFatigueAlertDto) {
    const { page = 1, limit = 10, id_user, level, status } = filters
    const query = this.fatigueAlertsRepository
      .createQueryBuilder('alert')
      .leftJoinAndSelect('alert.athlete', 'athlete')
      .orderBy('alert.date', 'DESC')
      .addOrderBy('alert.id_alert', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_user) query.andWhere('alert.id_user = :id_user', { id_user })
    if (level) query.andWhere('alert.level = :level', { level })
    if (status) query.andWhere('alert.status = :status', { status })

    const [alerts, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay alertas de fatiga registradas',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de alertas de fatiga exitosa',
      alerts: plainToInstance(ResponseFatigueAlertDto, alerts, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_alert: number) {
    const alert = await this.findOneById(id_alert)
    if (!alert)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta alerta de fatiga',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de alerta de fatiga exitosa',
      alert: plainToInstance(ResponseFatigueAlertDto, alert, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async updateStatus(
    id_alert: number,
    updateFatigueAlertDto: UpdateFatigueAlertDto,
  ) {
    const alert = await this.findOneById(id_alert)
    if (!alert)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta alerta de fatiga',
      })
    const updated = this.fatigueAlertsRepository.merge(
      alert,
      updateFatigueAlertDto,
    )
    await this.fatigueAlertsRepository.save(updated)
    return this.getById(id_alert)
  }
}
