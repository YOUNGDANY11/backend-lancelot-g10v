import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { ResponseInjuryRiskRuleConfigDto } from './dto/response-injury-risk-rule-config.dto'
import { UpdateInjuryRiskRuleConfigDto } from './dto/update-injury-risk-rule-config.dto'
import { InjuryRiskRuleConfig } from './entities/injury-risk-rule-config.entity'

@Injectable()
export class InjuryRiskRuleConfigService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(InjuryRiskRuleConfig)
    private readonly injuryRiskRuleConfigRepository: Repository<InjuryRiskRuleConfig>,
  ) {}

  async onApplicationBootstrap() {
    const existing = await this.injuryRiskRuleConfigRepository.find({
      order: { id_config: 'ASC' },
      take: 1,
    })
    if (existing.length === 0)
      await this.injuryRiskRuleConfigRepository.save({})
  }

  private async findActiveEntity() {
    const [config] = await this.injuryRiskRuleConfigRepository.find({
      order: { id_config: 'ASC' },
      take: 1,
    })
    return config
  }

  async getActive(): Promise<InjuryRiskRuleConfig> {
    const config = await this.findActiveEntity()
    if (config) return config
    return this.injuryRiskRuleConfigRepository.save({})
  }

  async getActiveResponse() {
    const config = await this.getActive()
    return {
      status: 'Success',
      mensaje: 'Consulta de configuración de reglas de riesgo de lesión exitosa',
      config: plainToInstance(ResponseInjuryRiskRuleConfigDto, config, {
        excludeExtraneousValues: true,
      }),
    }
  }

  private validate(updated: InjuryRiskRuleConfig) {
    if (
      Number(updated.sustained_acwr_min_days) >
      Number(updated.sustained_acwr_lookback_days)
    )
      throw new BadRequestException({
        status: 'Error',
        mensaje:
          'sustained_acwr_min_days no puede ser mayor que sustained_acwr_lookback_days',
      })
    if (
      Number(updated.sustained_rpe_min_sessions) >
      Number(updated.sustained_rpe_lookback_days)
    )
      throw new BadRequestException({
        status: 'Error',
        mensaje:
          'sustained_rpe_min_sessions no puede ser mayor que sustained_rpe_lookback_days',
      })
  }

  async update(updateInjuryRiskRuleConfigDto: UpdateInjuryRiskRuleConfigDto) {
    const config = await this.getActive()
    const updated = this.injuryRiskRuleConfigRepository.merge(
      config,
      updateInjuryRiskRuleConfigDto,
    )
    this.validate(updated)
    await this.injuryRiskRuleConfigRepository.save(updated)
    return {
      status: 'Success',
      mensaje: 'Configuración de reglas de riesgo de lesión actualizada con éxito',
      config: plainToInstance(ResponseInjuryRiskRuleConfigDto, updated, {
        excludeExtraneousValues: true,
      }),
    }
  }
}
