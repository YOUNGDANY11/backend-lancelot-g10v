import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, } from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { CreatePhysicalEvaluationDto } from './dto/create-physical-evaluation.dto'
import { FilterPhysicalEvaluationDto } from './dto/filter-physical-evaluation.dto'
import { ResponsePhysicalEvaluationDto } from './dto/response-physical-evaluation.dto'
import { UpdatePhysicalEvaluationDto } from './dto/update-physical-evaluation.dto'
import { PhysicalEvaluationsService } from './physical-evaluations.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Evaluaciones físicas')
@ApiBearerAuth('bearerAuth')
@Controller('physical-evaluations')
export class PhysicalEvaluationsController {
  constructor(
    private readonly physicalEvaluationsService: PhysicalEvaluationsService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get()
  @ApiOperation({ summary: 'Listar evaluaciones físicas' })
  @ApiQuery({ type: FilterPhysicalEvaluationDto })
  findAll(@Query() filters: FilterPhysicalEvaluationDto) {
    return this.physicalEvaluationsService.findAll(filters)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get(':id_user/timeline')
  @ApiOperation({ summary: 'Consultar el historial físico de un deportista' })
  @ApiParam({ name: 'id_user', type: Number })
  @ApiOkResponse({ type: ResponsePhysicalEvaluationDto, isArray: true })
  timeline(@Param('id_user', ParseIntPipe) id_user: number) {
    return this.physicalEvaluationsService.getTimeline(id_user)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una evaluación física por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponsePhysicalEvaluationDto })
  getById(@Param('id', ParseIntPipe) id_eval: number) {
    return this.physicalEvaluationsService.getById(id_eval)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Post()
  @ApiOperation({ summary: 'Registrar una evaluación física' })
  @ApiCreatedResponse({ type: ResponsePhysicalEvaluationDto })
  create(@Body() createPhysicalEvaluationDto: CreatePhysicalEvaluationDto) {
    return this.physicalEvaluationsService.create(createPhysicalEvaluationDto)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar una evaluación física' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_eval: number,
    @Body() updatePhysicalEvaluationDto: UpdatePhysicalEvaluationDto,
  ) {
    return this.physicalEvaluationsService.update(
      id_eval,
      updatePhysicalEvaluationDto,
    )
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar una evaluación física' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_eval: number) {
    return this.physicalEvaluationsService.delete(id_eval)
  }
}
