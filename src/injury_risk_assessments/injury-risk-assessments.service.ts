import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { FilterInjuryRiskAssessmentDto } from './dto/filter-injury-risk-assessment.dto'
import { ResponseInjuryRiskAssessmentDto } from './dto/response-injury-risk-assessment.dto'
import { UpdateInjuryRiskAssessmentDto } from './dto/update-injury-risk-assessment.dto'
import { InjuryRiskAssessment } from './entities/injury-risk-assessment.entity'

@Injectable()
export class InjuryRiskAssessmentsService {
  constructor(
    @InjectRepository(InjuryRiskAssessment)
    private readonly injuryRiskAssessmentsRepository: Repository<InjuryRiskAssessment>,
  ) {}

  async findOneById(id_assessment: number) {
    return this.injuryRiskAssessmentsRepository.findOne({
      where: { id_assessment },
      relations: { athlete: true },
    })
  }

  async findAll(filters: FilterInjuryRiskAssessmentDto) {
    const { page = 1, limit = 10, id_user, risk_level, status } = filters
    const query = this.injuryRiskAssessmentsRepository
      .createQueryBuilder('assessment')
      .leftJoinAndSelect('assessment.athlete', 'athlete')
      .orderBy('assessment.assessment_date', 'DESC')
      .addOrderBy('assessment.id_assessment', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (id_user) query.andWhere('assessment.id_user = :id_user', { id_user })
    if (risk_level)
      query.andWhere('assessment.risk_level = :risk_level', { risk_level })
    if (status) query.andWhere('assessment.status = :status', { status })

    const [assessments, total] = await query.getManyAndCount()
    if (!total)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay evaluaciones de riesgo de lesión registradas',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de evaluaciones de riesgo de lesión exitosa',
      assessments: plainToInstance(
        ResponseInjuryRiskAssessmentDto,
        assessments,
        { excludeExtraneousValues: true },
      ),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async getById(id_assessment: number) {
    const assessment = await this.findOneById(id_assessment)
    if (!assessment)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta evaluación de riesgo de lesión',
      })
    return {
      status: 'Success',
      mensaje: 'Consulta de evaluación de riesgo de lesión exitosa',
      assessment: plainToInstance(
        ResponseInjuryRiskAssessmentDto,
        assessment,
        { excludeExtraneousValues: true },
      ),
    }
  }

  async updateStatus(
    id_assessment: number,
    updateInjuryRiskAssessmentDto: UpdateInjuryRiskAssessmentDto,
  ) {
    const assessment = await this.findOneById(id_assessment)
    if (!assessment)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe esta evaluación de riesgo de lesión',
      })
    const updated = this.injuryRiskAssessmentsRepository.merge(
      assessment,
      updateInjuryRiskAssessmentDto,
    )
    await this.injuryRiskAssessmentsRepository.save(updated)
    return this.getById(id_assessment)
  }
}
