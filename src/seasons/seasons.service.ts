import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { CreateSeasonDto } from './dto/create-season.dto'
import { FilterSeasonDto } from './dto/filter-season.dto'
import { ResponseSeasonDto } from './dto/response-season.dto'
import { UpdateSeasonDto } from './dto/update-season.dto'
import { Season } from './entities/season.entity'

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonsRepository: Repository<Season>,
  ) {}

  private validateDateRange(start_date: string, end_date?: string | null) {
    if (end_date && end_date < start_date) {
      throw new BadRequestException({
        status: 'Error',
        mensaje:
          'La fecha de finalización no puede ser anterior a la fecha de inicio',
      })
    }
  }

  async findOneById(id_season: number) {
    return this.seasonsRepository.findOne({ where: { id_season } })
  }

  async findAll(filters: FilterSeasonDto) {
    const { page = 1, limit = 10, name, status, start_date } = filters
    const query = this.seasonsRepository
      .createQueryBuilder('season')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('season.start_date', 'DESC')

    if (name) query.andWhere('season.name ILIKE :name', { name: `%${name}%` })
    if (status) query.andWhere('season.status = :status', { status })
    if (start_date)
      query.andWhere('season.start_date = :start_date', { start_date })

    const [seasons, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay temporadas registradas',
      })

    return {
      status: 'Success',
      mensaje: 'Consulta de temporadas exitosa',
      seasons: plainToInstance(ResponseSeasonDto, seasons, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_season: number) {
    const season = await this.findOneById(id_season)
    if (!season)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta temporada',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de temporada exitosa',
      season: plainToInstance(ResponseSeasonDto, season, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(createSeasonDto: CreateSeasonDto) {
    this.validateDateRange(createSeasonDto.start_date, createSeasonDto.end_date)
    const season = await this.seasonsRepository.save(createSeasonDto)
    return {
      status: 'Success',
      mensaje: 'Temporada creada con éxito',
      season: plainToInstance(ResponseSeasonDto, season, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async update(id_season: number, updateSeasonDto: UpdateSeasonDto) {
    const season = await this.findOneById(id_season)
    if (!season)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta temporada',
      })
    const updated = this.seasonsRepository.merge(season, updateSeasonDto)
    this.validateDateRange(updated.start_date, updated.end_date)
    await this.seasonsRepository.save(updated)
    return {
      status: 'Success',
      mensaje: 'Temporada actualizada con éxito',
      season: plainToInstance(ResponseSeasonDto, updated, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async delete(id_season: number) {
    const season = await this.findOneById(id_season)
    if (!season)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta temporada',
      })
    await this.seasonsRepository.remove(season)
    return { status: 'Success', mensaje: 'Temporada eliminada con éxito' }
  }
}
