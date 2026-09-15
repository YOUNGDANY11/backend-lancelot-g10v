import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { CreateTechnicalEvaluationDto } from './dto/create-technical-evaluation.dto'
import { FilterTechnicalEvaluationDto } from './dto/filter-technical-evaluation.dto'
import { ResponseTechnicalEvaluationDto } from './dto/response-technical-evaluation.dto'
import { UpdateTechnicalEvaluationDto } from './dto/update-technical-evaluation.dto'
import { TechnicalEvaluationsService } from './technical-evaluations.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Evaluaciones técnicas')
@ApiBearerAuth('bearerAuth')
@Controller('technical-evaluations')
export class TechnicalEvaluationsController {
  constructor(
    private readonly technicalEvaluationsService: TechnicalEvaluationsService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get()
  @ApiOperation({ summary: 'Listar evaluaciones técnicas' })
  @ApiQuery({ type: FilterTechnicalEvaluationDto })
  findAll(@Query() filters: FilterTechnicalEvaluationDto) {
    return this.technicalEvaluationsService.findAll(filters)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get(':id_user/timeline')
  @ApiOperation({ summary: 'Consultar el historial técnico de un deportista' })
  @ApiParam({ name: 'id_user', type: Number })
  @ApiOkResponse({ type: ResponseTechnicalEvaluationDto, isArray: true })
  timeline(@Param('id_user', ParseIntPipe) id_user: number) {
    return this.technicalEvaluationsService.getTimeline(id_user)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una evaluación técnica por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseTechnicalEvaluationDto })
  getById(@Param('id', ParseIntPipe) id_eval_tech: number) {
    return this.technicalEvaluationsService.getById(id_eval_tech)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Post()
  @ApiOperation({ summary: 'Registrar una evaluación técnica' })
  @ApiCreatedResponse({ type: ResponseTechnicalEvaluationDto })
  create(@Body() createTechnicalEvaluationDto: CreateTechnicalEvaluationDto) {
    return this.technicalEvaluationsService.create(
      createTechnicalEvaluationDto,
    )
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar una evaluación técnica' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_eval_tech: number,
    @Body() updateTechnicalEvaluationDto: UpdateTechnicalEvaluationDto,
  ) {
    return this.technicalEvaluationsService.update(
      id_eval_tech,
      updateTechnicalEvaluationDto,
    )
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar una evaluación técnica' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_eval_tech: number) {
    return this.technicalEvaluationsService.delete(id_eval_tech)
  }
}
