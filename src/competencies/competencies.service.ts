import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCompetencyDto } from './dto/create-competency.dto'
import { UpdateCompetencyDto } from './dto/update-competency.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Competency } from './entities/competency.entity'
import { Repository } from 'typeorm'
import { FilterCompetency } from './dto/filter-competency.dto'

@Injectable()
export class CompetenciesService {
  constructor(
    @InjectRepository(Competency)
    private competencyRepository: Repository<Competency>,
  ) {}

  async findOneById(id_competency: number) {
    const category = await this.competencyRepository.findOne({
      where: { id_competency },
    })
    return category
  }

  async findAll(filters: FilterCompetency) {
    const {
      page = 1,
      limit = 10,
      name,
      current_year,
      start_date,
      finish_date,
    } = filters

    const skip = (page - 1) * limit

    const query = this.competencyRepository
      .createQueryBuilder('competency')
      .addSelect([
        'competency.id_competency',
        'competency.name',
        'competency.current_year',
        'competency.start_date',
        'competency.finish_date',
      ])
      .skip(skip)
      .take(limit)
      .orderBy('competency.id_competency', 'ASC')

    if (name) {
      query.andWhere('competency.name ILIKE :name', { name: `%${name}%` })
    }

    if (current_year) {
      query.andWhere('competency.current_year = :current_year', {
        current_year,
      })
    }

    if (start_date) {
      query.andWhere('competency.start_date = :start_date', { start_date })
    }

    if (finish_date) {
      query.andWhere('competency.finish_date =:finish_date', { finish_date })
    }

    const [competency, total] = await query.getManyAndCount()

    if (total === 0)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay competencias registradas',
      })

    return {
      status: 'Success',
      mensaje: 'Consulta de competencias exitosa',
      competency,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async getById(id_competency: number) {
    const competency = await this.findOneById(id_competency)
    if (!competency)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta competencia',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de competencia exitosa',
      competency,
    }
  }

  async create(createCompetencyDto: CreateCompetencyDto) {
    const competency = await this.competencyRepository.save(createCompetencyDto)
    return {
      status: 'Success',
      mensaje: 'Creacion de competencia exitosa',
      competency,
    }
  }

  async update(
    id_competency: number,
    updateCompetencyDto: UpdateCompetencyDto,
  ) {
    const existsCompetency = await this.findOneById(id_competency)
    if (!existsCompetency)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta competencia',
      })
    const competency = await this.competencyRepository.merge(
      existsCompetency,
      updateCompetencyDto,
    )
    await this.competencyRepository.save(competency)
    return {
      status: 'Success',
      mensaje: 'competencia actualizada con exito',
      competency,
    }
  }

  async delete(id_competency: number) {
    const competency = await this.findOneById(id_competency)
    if (!competency)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta competencia',
      })
    await this.competencyRepository.remove(competency)
    return {
      status: 'Success',
      mensaje: 'competencia eliminada con exito',
      competency,
    }
  }
}
