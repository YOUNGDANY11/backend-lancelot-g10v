import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { CreateParentalConsentDto } from './dto/create-parental-consent.dto'
import { FilterParentalConsentDto } from './dto/filter-parental-consent.dto'
import { ResponseParentalConsentDto } from './dto/response-parental-consent.dto'
import { UpdateParentalConsentDto } from './dto/update-parental-consent.dto'
import { ParentalConsent } from './entities/parental-consent.entity'

@Injectable()
export class ParentalConsentsService {
  constructor(
    @InjectRepository(ParentalConsent)
    private readonly parentalConsentsRepository: Repository<ParentalConsent>,
    private readonly usersService: UsersService,
  ) {}

  private isMinorOn(birthDate: string, date: Date) {
    const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number)
    let age = date.getUTCFullYear() - birthYear
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    if (month < birthMonth || (month === birthMonth && day < birthDay)) age -= 1
    return age < 18
  }

  private async validateMinor(id_user: number, signed_at: string | Date) {
    const athlete = await this.usersService.findOneById(id_user)
    if (!athlete)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'No existe el deportista indicado',
      })
    if (!athlete.birth_date)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'El deportista debe tener fecha de nacimiento para registrar consentimiento',
      })
    if (!this.isMinorOn(athlete.birth_date, new Date(signed_at)))
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'El consentimiento parental solo aplica a deportistas menores de edad',
      })
  }

  async findOneById(id_consent: number) {
    return this.parentalConsentsRepository.findOne({
      where: { id_consent },
      relations: { athlete: true },
    })
  }

  async findAll(filters: FilterParentalConsentDto) {
    const { page = 1, limit = 10, id_user, status } = filters
    const query = this.parentalConsentsRepository
      .createQueryBuilder('consent')
      .leftJoinAndSelect('consent.athlete', 'athlete')
      .orderBy('consent.signed_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
    if (id_user) query.andWhere('consent.id_user = :id_user', { id_user })
    if (status) query.andWhere('consent.status = :status', { status })

    const [consents, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay consentimientos parentales registrados',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de consentimientos parentales exitosa',
      consents: plainToInstance(ResponseParentalConsentDto, consents, {
        excludeExtraneousValues: true,
      }),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_consent: number) {
    const consent = await this.findOneById(id_consent)
    if (!consent)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe este consentimiento parental',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de consentimiento parental exitosa',
      consent: plainToInstance(ResponseParentalConsentDto, consent, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(createParentalConsentDto: CreateParentalConsentDto) {
    await this.validateMinor(
      createParentalConsentDto.id_user,
      createParentalConsentDto.signed_at,
    )
    const consent = await this.parentalConsentsRepository.save(
      createParentalConsentDto,
    )
    return this.getById(consent.id_consent)
  }

  async update(
    id_consent: number,
    updateParentalConsentDto: UpdateParentalConsentDto,
  ) {
    const consent = await this.findOneById(id_consent)
    if (!consent)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe este consentimiento parental',
      })
    const updated = this.parentalConsentsRepository.merge(
      consent,
      updateParentalConsentDto,
    )
    await this.validateMinor(updated.id_user, updated.signed_at)
    await this.parentalConsentsRepository.save(updated)
    return this.getById(id_consent)
  }

  async delete(id_consent: number) {
    const consent = await this.findOneById(id_consent)
    if (!consent)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe este consentimiento parental',
      })
    await this.parentalConsentsRepository.remove(consent)
    return {
      status: 'Success',
      mensaje: 'Consentimiento parental eliminado con éxito',
    }
  }
}
