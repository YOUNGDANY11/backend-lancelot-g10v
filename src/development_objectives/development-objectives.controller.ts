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
import { CreateDevelopmentObjectiveDto } from './dto/create-development-objective.dto'
import { FilterDevelopmentObjectiveDto } from './dto/filter-development-objective.dto'
import { ResponseDevelopmentObjectiveDto } from './dto/response-development-objective.dto'
import { UpdateDevelopmentObjectiveDto } from './dto/update-development-objective.dto'
import { DevelopmentObjectivesService } from './development-objectives.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Objetivos de desarrollo')
@ApiBearerAuth('bearerAuth')
@Controller('development-objectives')
export class DevelopmentObjectivesController {
  constructor(
    private readonly developmentObjectivesService: DevelopmentObjectivesService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get()
  @ApiOperation({ summary: 'Listar objetivos de desarrollo' })
  @ApiQuery({ type: FilterDevelopmentObjectiveDto })
  findAll(@Query() filters: FilterDevelopmentObjectiveDto) {
    return this.developmentObjectivesService.findAll(filters)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar un objetivo de desarrollo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseDevelopmentObjectiveDto })
  getById(@Param('id', ParseIntPipe) id_objective: number) {
    return this.developmentObjectivesService.getById(id_objective)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Post()
  @ApiOperation({ summary: 'Registrar un objetivo de desarrollo' })
  @ApiCreatedResponse({ type: ResponseDevelopmentObjectiveDto })
  create(
    @Body() createDevelopmentObjectiveDto: CreateDevelopmentObjectiveDto,
  ) {
    return this.developmentObjectivesService.create(
      createDevelopmentObjectiveDto,
    )
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar un objetivo de desarrollo' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_objective: number,
    @Body() updateDevelopmentObjectiveDto: UpdateDevelopmentObjectiveDto,
  ) {
    return this.developmentObjectivesService.update(
      id_objective,
      updateDevelopmentObjectiveDto,
    )
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un objetivo de desarrollo' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_objective: number) {
    return this.developmentObjectivesService.delete(id_objective)
  }
}
