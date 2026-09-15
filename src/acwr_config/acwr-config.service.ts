import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { UpdateAcwrThresholdDto } from './dto/update-acwr-threshold.dto'
import { ResponseAcwrThresholdDto } from './dto/response-acwr-threshold.dto'
import { AcwrThreshold } from './entities/acwr-threshold.entity'

@Injectable()
export class AcwrConfigService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(AcwrThreshold)
    private readonly acwrThresholdsRepository: Repository<AcwrThreshold>,
  ) {}

  async onApplicationBootstrap() {
    const existing = await this.acwrThresholdsRepository.find({
      order: { id_threshold: 'ASC' },
      take: 1,
    })
    if (existing.length === 0) await this.acwrThresholdsRepository.save({})
  }

  private async findActiveEntity() {
    const [threshold] = await this.acwrThresholdsRepository.find({
      order: { id_threshold: 'ASC' },
      take: 1,
    })
    return threshold
  }

  async getActive(): Promise<AcwrThreshold> {
    const threshold = await this.findActiveEntity()
    if (threshold) return threshold
    return this.acwrThresholdsRepository.save({})
  }

  async getActiveResponse() {
    const threshold = await this.getActive()
    return {
      status: 'Success',
      mensaje: 'Consulta de umbrales de ACWR exitosa',
      threshold: plainToInstance(ResponseAcwrThresholdDto, threshold, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async update(updateAcwrThresholdDto: UpdateAcwrThresholdDto) {
    const threshold = await this.getActive()
    const updated = this.acwrThresholdsRepository.merge(
      threshold,
      updateAcwrThresholdDto,
    )
    if (
      Number(updated.low_min) >= Number(updated.low_max) ||
      Number(updated.low_max) >= Number(updated.medium_max)
    )
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'Los umbrales deben cumplir low_min < low_max < medium_max',
      })
    await this.acwrThresholdsRepository.save(updated)
    return {
      status: 'Success',
      mensaje: 'Umbrales de ACWR actualizados con éxito',
      threshold: plainToInstance(ResponseAcwrThresholdDto, updated, {
        excludeExtraneousValues: true,
      }),
    }
  }
}
