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
import { GetUser } from 'src/auth/decorators/get-user.decorator'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { assertOwnRecordOrStaff, isDeportista } from 'src/common/utils/ownership.util'
import { User } from 'src/users/entities/user.entity'
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

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'DEPORTISTA')
  @Get()
  @ApiOperation({ summary: 'Listar objetivos de desarrollo' })
  @ApiQuery({ type: FilterDevelopmentObjectiveDto })
  findAll(
    @Query() filters: FilterDevelopmentObjectiveDto,
    @GetUser() user: User,
  ) {
    if (isDeportista(user)) filters.id_user = user.id_user
    return this.developmentObjectivesService.findAll(filters)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'DEPORTISTA')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar un objetivo de desarrollo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseDevelopmentObjectiveDto })
  async getById(
    @Param('id', ParseIntPipe) id_objective: number,
    @GetUser() user: User,
  ) {
    const result = await this.developmentObjectivesService.getById(id_objective)
    assertOwnRecordOrStaff(user, result.objective.id_user)
    return result
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
