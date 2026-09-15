import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { SeasonsService } from 'src/seasons/seasons.service'
import { UsersService } from 'src/users/users.service'
import { CreatePhysicalEvaluationDto } from './dto/create-physical-evaluation.dto'
import { FilterPhysicalEvaluationDto } from './dto/filter-physical-evaluation.dto'
import { ResponsePhysicalEvaluationDto } from './dto/response-physical-evaluation.dto'
import { UpdatePhysicalEvaluationDto } from './dto/update-physical-evaluation.dto'
import { PhysicalEvaluation } from './entities/physical-evaluation.entity'

@Injectable()
export class PhysicalEvaluationsService {
  constructor(
    @InjectRepository(PhysicalEvaluation)
    private readonly physicalEvaluationsRepository: Repository<PhysicalEvaluation>,
    private readonly usersService: UsersService,
    private readonly seasonsService: SeasonsService,
  ) {}

  private async validateReferences(
    id_user: number,
    id_season: number,
    evaluator_id?: number | null,
  ) {
    const athlete = await this.usersService.findOneById(id_user)
    if (!athlete)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe el deportista indicado',
      })

    const season = await this.seasonsService.findOneById(id_season)
    if (!season)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe la temporada indicada',
      })

    if (evaluator_id) {
      const evaluator = await this.usersService.findOneById(evaluator_id)
      if (!evaluator)
        throw new BadRequestException({
          status: 'Error',
          mensaje: 'No existe el evaluador indicado',
        })
    }
  }

  async findOneById(id_eval: number) {
    return this.physicalEvaluationsRepository.findOne({
      where: { id_eval },
      relations: { athlete: true, season: true, evaluator: true },
    })
  }

  async findAll(filters: FilterPhysicalEvaluationDto) {
    const {
      page = 1,
      limit = 10,
      id_user,
      id_season,
      stage,
      eval_date,
    } = filters
    const query = this.physicalEvaluationsRepository
      .createQueryBuilder('evaluation')
      .leftJoinAndSelect('evaluation.athlete', 'athlete')
      .leftJoinAndSelect('evaluation.season', 'season')
      .leftJoinAndSelect('evaluation.evaluator', 'evaluator')
      .orderBy('evaluation.eval_date', 'DESC')
      .addOrderBy('evaluation.id_eval', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_user) query.andWhere('evaluation.id_user = :id_user', { id_user })
    if (id_season)
      query.andWhere('evaluation.id_season = :id_season', { id_season })
    if (stage) query.andWhere('evaluation.stage = :stage', { stage })
    if (eval_date)
      query.andWhere('evaluation.eval_date = :eval_date', { eval_date })

    const [evaluations, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay evaluaciones físicas registradas',
      })

    return {
      status: 'Success',
      mensaje: 'Consulta de evaluaciones físicas exitosa',
      evaluations: plainToInstance(ResponsePhysicalEvaluationDto, evaluations, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_eval: number) {
    const evaluation = await this.findOneById(id_eval)
    if (!evaluation)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta evaluación física',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de evaluación física exitosa',
      evaluation: plainToInstance(ResponsePhysicalEvaluationDto, evaluation, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async getTimeline(id_user: number) {
    const athlete = await this.usersService.findOneById(id_user)
    if (!athlete)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe el deportista indicado',
      })

    const evaluations = await this.physicalEvaluationsRepository.find({
      where: { id_user },
      relations: { athlete: true, season: true, evaluator: true },
      order: { eval_date: 'ASC', id_eval: 'ASC' },
    })
    return {
      status: 'Success',
      mensaje: 'Historial de evaluaciones físicas exitoso',
      evaluations: plainToInstance(ResponsePhysicalEvaluationDto, evaluations, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(createPhysicalEvaluationDto: CreatePhysicalEvaluationDto) {
    await this.validateReferences(
      createPhysicalEvaluationDto.id_user,
      createPhysicalEvaluationDto.id_season,
      createPhysicalEvaluationDto.evaluator_id,
    )
    const evaluation = await this.physicalEvaluationsRepository.save(
      createPhysicalEvaluationDto,
    )
    return this.getById(evaluation.id_eval)
  }

  async update(
    id_eval: number,
    updatePhysicalEvaluationDto: UpdatePhysicalEvaluationDto,
  ) {
    const evaluation = await this.findOneById(id_eval)
    if (!evaluation)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta evaluación física',
      })
    const updated = this.physicalEvaluationsRepository.merge(
      evaluation,
      updatePhysicalEvaluationDto,
    )
    await this.validateReferences(
      updated.id_user,
      updated.id_season,
      updated.evaluator_id,
    )
    await this.physicalEvaluationsRepository.save(updated)
    return this.getById(id_eval)
  }

  async delete(id_eval: number) {
    const evaluation = await this.findOneById(id_eval)
    if (!evaluation)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta evaluación física',
      })
    await this.physicalEvaluationsRepository.remove(evaluation)
    return {
      status: 'Success',
      mensaje: 'Evaluación física eliminada con éxito',
    }
  }
}
