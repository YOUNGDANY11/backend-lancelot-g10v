import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { FilterHealthRecordAccessLogDto } from './dto/filter-health-record-access-log.dto'
import { ResponseHealthRecordAccessLogDto } from './dto/response-health-record-access-log.dto'
import {
  HealthRecordAccessAction,
  HealthRecordAccessLog,
} from './entities/health-record-access-log.entity'

@Injectable()
export class HealthRecordAuditService {
  constructor(
    @InjectRepository(HealthRecordAccessLog)
    private readonly accessLogsRepository: Repository<HealthRecordAccessLog>,
  ) {}

  async log(
    action: HealthRecordAccessAction,
    accessed_by: number,
    id_health?: number | null,
  ) {
    await this.accessLogsRepository.save({
      action,
      accessed_by,
      id_health: id_health ?? null,
    })
  }

  async findAll(filters: FilterHealthRecordAccessLogDto) {
    const { page = 1, limit = 10, id_health } = filters
    const query = this.accessLogsRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.accessedByUser', 'accessedByUser')
      .orderBy('log.accessed_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_health) query.andWhere('log.id_health = :id_health', { id_health })

    const [logs, total] = await query.getManyAndCount()
    return {
      status: 'Success',
      mensaje: 'Consulta de auditoría de registros de salud exitosa',
      logs: plainToInstance(ResponseHealthRecordAccessLogDto, logs, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }
}
