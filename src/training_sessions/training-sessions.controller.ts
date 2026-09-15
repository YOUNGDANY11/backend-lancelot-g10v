import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { CreateTrainingSessionDto } from './dto/create-training-session.dto'
import { FilterTrainingSessionDto } from './dto/filter-training-session.dto'
import { ResponseTrainingSessionDto } from './dto/response-training-session.dto'
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto'
import { TrainingSessionsService } from './training-sessions.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Sesiones de entrenamiento')
@ApiBearerAuth('bearerAuth')
@Controller('training-sessions')
export class TrainingSessionsController {
  constructor(
    private readonly trainingSessionsService: TrainingSessionsService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'DEPORTISTA')
  @Get()
  @ApiOperation({ summary: 'Listar sesiones de entrenamiento' })
  @ApiQuery({ type: FilterTrainingSessionDto })
  findAll(@Query() filters: FilterTrainingSessionDto) {
    return this.trainingSessionsService.findAll(filters)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'DEPORTISTA')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una sesión de entrenamiento por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseTrainingSessionDto })
  getById(@Param('id', ParseIntPipe) id_session: number) {
    return this.trainingSessionsService.getById(id_session)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Post()
  @ApiOperation({ summary: 'Registrar una sesión de entrenamiento' })
  @ApiCreatedResponse({ type: ResponseTrainingSessionDto })
  create(@Body() createTrainingSessionDto: CreateTrainingSessionDto) {
    return this.trainingSessionsService.create(createTrainingSessionDto)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar una sesión de entrenamiento' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_session: number,
    @Body() updateTrainingSessionDto: UpdateTrainingSessionDto,
  ) {
    return this.trainingSessionsService.update(
      id_session,
      updateTrainingSessionDto,
    )
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar una sesión de entrenamiento' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_session: number) {
    return this.trainingSessionsService.delete(id_session)
  }
}
