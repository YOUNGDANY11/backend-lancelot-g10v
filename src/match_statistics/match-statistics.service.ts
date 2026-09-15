import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { MatchesService } from 'src/matches/matches.service'
import { UsersService } from 'src/users/users.service'
import { CreateMatchStatisticDto } from './dto/create-match-statistic.dto'
import { FilterMatchStatisticDto } from './dto/filter-match-statistic.dto'
import { ResponseMatchStatisticDto } from './dto/response-match-statistic.dto'
import { UpdateMatchStatisticDto } from './dto/update-match-statistic.dto'
import { MatchStatistic } from './entities/match-statistic.entity'

@Injectable()
export class MatchStatisticsService {
  constructor(
    @InjectRepository(MatchStatistic)
    private readonly matchStatisticsRepository: Repository<MatchStatistic>,
    private readonly usersService: UsersService,
    private readonly matchesService: MatchesService,
  ) {}

  private async validateReferences(id_match: number, id_user: number) {
    const [match, athlete] = await Promise.all([
      this.matchesService.findOneById(id_match),
      this.usersService.findOneById(id_user),
    ])
    if (!match)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe el partido indicado',
      })
    if (!athlete)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe el deportista indicado',
      })
  }

  async findOneById(id_match_stat: number) {
    return this.matchStatisticsRepository.findOne({
      where: { id_match_stat },
      relations: { match: true, athlete: true },
    })
  }

  async findAll(filters: FilterMatchStatisticDto) {
    const { page = 1, limit = 10, id_user, id_match } = filters
    const query = this.matchStatisticsRepository
      .createQueryBuilder('stat')
      .leftJoinAndSelect('stat.match', 'match')
      .leftJoinAndSelect('stat.athlete', 'athlete')
      .orderBy('stat.id_match_stat', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_user) query.andWhere('stat.id_user = :id_user', { id_user })
    if (id_match) query.andWhere('stat.id_match = :id_match', { id_match })

    const [stats, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay estadísticas de partido registradas',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de estadísticas de partido exitosa',
      stats: plainToInstance(ResponseMatchStatisticDto, stats, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_match_stat: number) {
    const stat = await this.findOneById(id_match_stat)
    if (!stat)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta estadística de partido',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de estadística de partido exitosa',
      stat: plainToInstance(ResponseMatchStatisticDto, stat, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(createMatchStatisticDto: CreateMatchStatisticDto) {
    await this.validateReferences(
      createMatchStatisticDto.id_match,
      createMatchStatisticDto.id_user,
    )
    const stat = await this.matchStatisticsRepository.save(
      createMatchStatisticDto,
    )
    return this.getById(stat.id_match_stat)
  }

  async update(
    id_match_stat: number,
    updateMatchStatisticDto: UpdateMatchStatisticDto,
  ) {
    const stat = await this.findOneById(id_match_stat)
    if (!stat)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta estadística de partido',
      })
    const updated = this.matchStatisticsRepository.merge(
      stat,
      updateMatchStatisticDto,
    )
    await this.validateReferences(updated.id_match, updated.id_user)
    await this.matchStatisticsRepository.save(updated)
    return this.getById(id_match_stat)
  }

  async delete(id_match_stat: number) {
    const stat = await this.findOneById(id_match_stat)
    if (!stat)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta estadística de partido',
      })
    await this.matchStatisticsRepository.remove(stat)
    return {
      status: 'Success',
      mensaje: 'Estadística de partido eliminada con éxito',
    }
  }
}
