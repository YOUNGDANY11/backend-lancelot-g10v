import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { FilterInjuryRiskAssessmentDto } from './dto/filter-injury-risk-assessment.dto'
import { ResponseInjuryRiskAssessmentDto } from './dto/response-injury-risk-assessment.dto'
import { UpdateInjuryRiskAssessmentDto } from './dto/update-injury-risk-assessment.dto'
import { InjuryRiskAssessmentsService } from './injury-risk-assessments.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'ENCARGADO_SALUD')
@ApiTags('Evaluaciones de riesgo de lesión')
@ApiBearerAuth('bearerAuth')
@Controller('injury-risk-assessments')
export class InjuryRiskAssessmentsController {
  constructor(
    private readonly injuryRiskAssessmentsService: InjuryRiskAssessmentsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar evaluaciones de riesgo de lesión (ej. ?status=open)',
  })
  @ApiQuery({ type: FilterInjuryRiskAssessmentDto })
  findAll(@Query() filters: FilterInjuryRiskAssessmentDto) {
    return this.injuryRiskAssessmentsService.findAll(filters)
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una evaluación de riesgo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseInjuryRiskAssessmentDto })
  getById(@Param('id', ParseIntPipe) id_assessment: number) {
    return this.injuryRiskAssessmentsService.getById(id_assessment)
  }

  @Put('id/:id')
  @ApiOperation({
    summary: 'Marcar una evaluación de riesgo como revisada o descartada',
  })
  @ApiParam({ name: 'id', type: Number })
  updateStatus(
    @Param('id', ParseIntPipe) id_assessment: number,
    @Body() updateInjuryRiskAssessmentDto: UpdateInjuryRiskAssessmentDto,
  ) {
    return this.injuryRiskAssessmentsService.updateStatus(
      id_assessment,
      updateInjuryRiskAssessmentDto,
    )
  }
}
