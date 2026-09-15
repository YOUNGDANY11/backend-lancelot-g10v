import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { CreateInjuryDto } from './dto/create-injury.dto'
import { FilterInjuryDto } from './dto/filter-injury.dto'
import { ResponseInjuryDto } from './dto/response-injury.dto'
import { UpdateInjuryDto } from './dto/update-injury.dto'
import { Injury } from './entities/injury.entity'

@Injectable()
export class InjuriesService {
  constructor(
    @InjectRepository(Injury)
    private readonly injuriesRepository: Repository<Injury>,
    private readonly usersService: UsersService,
  ) {}

  private async validateReferences(id_user: number, registered_by: number) {
    const [athlete, registeredByUser] = await Promise.all([
      this.usersService.findOneById(id_user),
      this.usersService.findOneById(registered_by),
    ])
    if (!athlete)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe el deportista indicado',
      })
    if (!registeredByUser)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe el usuario que registra la lesión',
      })
  }

  async findOneById(id_injury: number) {
    return this.injuriesRepository.findOne({
      where: { id_injury },
      relations: { athlete: true, registeredByUser: true },
    })
  }

  async findAll(filters: FilterInjuryDto) {
    const { page = 1, limit = 10, id_user, severity, status } = filters
    const query = this.injuriesRepository
      .createQueryBuilder('injury')
      .leftJoinAndSelect('injury.athlete', 'athlete')
      .leftJoinAndSelect('injury.registeredByUser', 'registeredByUser')
      .orderBy('injury.injury_date', 'DESC')
      .addOrderBy('injury.id_injury', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_user) query.andWhere('injury.id_user = :id_user', { id_user })
    if (severity)
      query.andWhere('injury.severity = :severity', { severity })
    if (status) query.andWhere('injury.status = :status', { status })

    const [injuries, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay lesiones registradas',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de lesiones exitosa',
      injuries: plainToInstance(ResponseInjuryDto, injuries, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_injury: number) {
    const injury = await this.findOneById(id_injury)
    if (!injury)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta lesión',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de lesión exitosa',
      injury: plainToInstance(ResponseInjuryDto, injury, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(createInjuryDto: CreateInjuryDto) {
    await this.validateReferences(
      createInjuryDto.id_user,
      createInjuryDto.registered_by,
    )
    const injury = await this.injuriesRepository.save(createInjuryDto)
    return this.getById(injury.id_injury)
  }

  async update(id_injury: number, updateInjuryDto: UpdateInjuryDto) {
    const injury = await this.findOneById(id_injury)
    if (!injury)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta lesión',
      })
    const updated = this.injuriesRepository.merge(injury, updateInjuryDto)
    await this.validateReferences(updated.id_user, updated.registered_by)
    await this.injuriesRepository.save(updated)
    return this.getById(id_injury)
  }

  async delete(id_injury: number) {
    const injury = await this.findOneById(id_injury)
    if (!injury)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta lesión',
      })
    await this.injuriesRepository.remove(injury)
    return {
      status: 'Success',
      mensaje: 'Lesión eliminada con éxito',
    }
  }
}
