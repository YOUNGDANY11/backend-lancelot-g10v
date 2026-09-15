import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, } from '@nestjs/swagger'
import { GetUser } from 'src/auth/decorators/get-user.decorator'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { assertOwnRecordOrStaff, isDeportista } from 'src/common/utils/ownership.util'
import { User } from 'src/users/entities/user.entity'
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

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'DEPORTISTA')
  @Get()
  @ApiOperation({ summary: 'Listar evaluaciones físicas' })
  @ApiQuery({ type: FilterPhysicalEvaluationDto })
  findAll(
    @Query() filters: FilterPhysicalEvaluationDto,
    @GetUser() user: User,
  ) {
    if (isDeportista(user)) filters.id_user = user.id_user
    return this.physicalEvaluationsService.findAll(filters)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'DEPORTISTA')
  @Get(':id_user/timeline')
  @ApiOperation({ summary: 'Consultar el historial físico de un deportista' })
  @ApiParam({ name: 'id_user', type: Number })
  @ApiOkResponse({ type: ResponsePhysicalEvaluationDto, isArray: true })
  timeline(
    @Param('id_user', ParseIntPipe) id_user: number,
    @GetUser() user: User,
  ) {
    assertOwnRecordOrStaff(user, id_user)
    return this.physicalEvaluationsService.getTimeline(id_user)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'DEPORTISTA')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una evaluación física por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponsePhysicalEvaluationDto })
  async getById(@Param('id', ParseIntPipe) id_eval: number, @GetUser() user: User) {
    const result = await this.physicalEvaluationsService.getById(id_eval)
    assertOwnRecordOrStaff(user, result.evaluation.id_user)
    return result
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
