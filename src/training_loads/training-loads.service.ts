import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { TrainingSessionsService } from 'src/training_sessions/training-sessions.service'
import { UsersService } from 'src/users/users.service'
import { CreateTrainingLoadDto } from './dto/create-training-load.dto'
import { FilterTrainingLoadDto } from './dto/filter-training-load.dto'
import { ResponseTrainingLoadDto } from './dto/response-training-load.dto'
import { UpdateTrainingLoadDto } from './dto/update-training-load.dto'
import { TrainingLoad } from './entities/training-load.entity'

@Injectable()
export class TrainingLoadsService {
  constructor(
    @InjectRepository(TrainingLoad)
    private readonly trainingLoadsRepository: Repository<TrainingLoad>,
    private readonly usersService: UsersService,
    private readonly trainingSessionsService: TrainingSessionsService,
  ) {}

  private async validateReferences(id_session: number, id_user: number) {
    const [session, athlete] = await Promise.all([
      this.trainingSessionsService.findOneById(id_session),
      this.usersService.findOneById(id_user),
    ])
    if (!session)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe la sesión de entrenamiento indicada',
      })
    if (!athlete)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe el deportista indicado',
      })
  }

  async findOneById(id_load: number) {
    return this.trainingLoadsRepository.findOne({
      where: { id_load },
      relations: { session: true, athlete: true },
    })
  }

  async findAll(filters: FilterTrainingLoadDto) {
    const { page = 1, limit = 10, id_user, id_session } = filters
    const query = this.trainingLoadsRepository
      .createQueryBuilder('load')
      .leftJoinAndSelect('load.session', 'session')
      .leftJoinAndSelect('load.athlete', 'athlete')
      .orderBy('load.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_user) query.andWhere('load.id_user = :id_user', { id_user })
    if (id_session)
      query.andWhere('load.id_session = :id_session', { id_session })

    const [loads, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay cargas de entrenamiento registradas',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de cargas de entrenamiento exitosa',
      loads: plainToInstance(ResponseTrainingLoadDto, loads, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_load: number) {
    const load = await this.findOneById(id_load)
    if (!load)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta carga de entrenamiento',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de carga de entrenamiento exitosa',
      load: plainToInstance(ResponseTrainingLoadDto, load, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(createTrainingLoadDto: CreateTrainingLoadDto) {
    await this.validateReferences(
      createTrainingLoadDto.id_session,
      createTrainingLoadDto.id_user,
    )
    const load = await this.trainingLoadsRepository.save({
      ...createTrainingLoadDto,
      session_load:
        createTrainingLoadDto.rpe * createTrainingLoadDto.duration_min,
    })
    return this.getById(load.id_load)
  }

  async update(id_load: number, updateTrainingLoadDto: UpdateTrainingLoadDto) {
    const load = await this.findOneById(id_load)
    if (!load)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta carga de entrenamiento',
      })
    const updated = this.trainingLoadsRepository.merge(
      load,
      updateTrainingLoadDto,
    )
    await this.validateReferences(updated.id_session, updated.id_user)
    updated.session_load = updated.rpe * updated.duration_min
    await this.trainingLoadsRepository.save(updated)
    return this.getById(id_load)
  }

  async delete(id_load: number) {
    const load = await this.findOneById(id_load)
    if (!load)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta carga de entrenamiento',
      })
    await this.trainingLoadsRepository.remove(load)
    return {
      status: 'Success',
      mensaje: 'Carga de entrenamiento eliminada con éxito',
    }
  }
}
