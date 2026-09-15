import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { CategoriesService } from 'src/categories/categories.service'
import { SeasonsService } from 'src/seasons/seasons.service'
import { CreateTrainingSessionDto } from './dto/create-training-session.dto'
import { FilterTrainingSessionDto } from './dto/filter-training-session.dto'
import { ResponseTrainingSessionDto } from './dto/response-training-session.dto'
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto'
import { TrainingSession } from './entities/training-session.entity'

@Injectable()
export class TrainingSessionsService {
  constructor(
    @InjectRepository(TrainingSession)
    private readonly trainingSessionsRepository: Repository<TrainingSession>,
    private readonly categoriesService: CategoriesService,
    private readonly seasonsService: SeasonsService,
  ) {}

  private async validateReferences(id_category: number, id_season: number) {
    const [category, season] = await Promise.all([
      this.categoriesService.findOneById(id_category),
      this.seasonsService.findOneById(id_season),
    ])
    if (!category)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe la categoría indicada',
      })
    if (!season)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe la temporada indicada',
      })
  }

  async findOneById(id_session: number) {
    return this.trainingSessionsRepository.findOne({
      where: { id_session },
      relations: { category: true, season: true },
    })
  }

  async findAll(filters: FilterTrainingSessionDto) {
    const { page = 1, limit = 10, id_category, id_season, type, date } =
      filters
    const query = this.trainingSessionsRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.category', 'category')
      .leftJoinAndSelect('session.season', 'season')
      .orderBy('session.date', 'DESC')
      .addOrderBy('session.id_session', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_category)
      query.andWhere('session.id_category = :id_category', { id_category })
    if (id_season)
      query.andWhere('session.id_season = :id_season', { id_season })
    if (type) query.andWhere('session.type = :type', { type })
    if (date) query.andWhere('session.date = :date', { date })

    const [sessions, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay sesiones de entrenamiento registradas',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de sesiones de entrenamiento exitosa',
      sessions: plainToInstance(ResponseTrainingSessionDto, sessions, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_session: number) {
    const session = await this.findOneById(id_session)
    if (!session)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta sesión de entrenamiento',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de sesión de entrenamiento exitosa',
      session: plainToInstance(ResponseTrainingSessionDto, session, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(createTrainingSessionDto: CreateTrainingSessionDto) {
    await this.validateReferences(
      createTrainingSessionDto.id_category,
      createTrainingSessionDto.id_season,
    )
    const session = await this.trainingSessionsRepository.save(
      createTrainingSessionDto,
    )
    return this.getById(session.id_session)
  }

  async update(
    id_session: number,
    updateTrainingSessionDto: UpdateTrainingSessionDto,
  ) {
    const session = await this.findOneById(id_session)
    if (!session)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta sesión de entrenamiento',
      })
    const updated = this.trainingSessionsRepository.merge(
      session,
      updateTrainingSessionDto,
    )
    await this.validateReferences(updated.id_category, updated.id_season)
    await this.trainingSessionsRepository.save(updated)
    return this.getById(id_session)
  }

  async delete(id_session: number) {
    const session = await this.findOneById(id_session)
    if (!session)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta sesión de entrenamiento',
      })
    await this.trainingSessionsRepository.remove(session)
    return {
      status: 'Success',
      mensaje: 'Sesión de entrenamiento eliminada con éxito',
    }
  }
}
