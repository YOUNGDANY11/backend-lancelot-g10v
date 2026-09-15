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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { CreatePositionWeightProfileDto } from './dto/create-position-weight-profile.dto'
import { FilterPositionWeightProfileDto } from './dto/filter-position-weight-profile.dto'
import { ResponsePositionWeightProfileDto } from './dto/response-position-weight-profile.dto'
import { UpdatePositionWeightProfileDto } from './dto/update-position-weight-profile.dto'
import { PositionWeightProfilesService } from './position-weight-profiles.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DIRECTOR_TECNICO')
@ApiTags('Perfiles de peso por posición')
@ApiBearerAuth('bearerAuth')
@Controller('position-weight-profiles')
export class PositionWeightProfilesController {
  constructor(
    private readonly positionWeightProfilesService: PositionWeightProfilesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar perfiles de peso por posición' })
  @ApiQuery({ type: FilterPositionWeightProfileDto })
  findAll(@Query() filters: FilterPositionWeightProfileDto) {
    return this.positionWeightProfilesService.findAll(filters)
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar un perfil de peso por posición por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponsePositionWeightProfileDto })
  getById(@Param('id', ParseIntPipe) id_profile: number) {
    return this.positionWeightProfilesService.getById(id_profile)
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un perfil de peso por posición y categoría de edad',
  })
  create(
    @Body() createPositionWeightProfileDto: CreatePositionWeightProfileDto,
  ) {
    return this.positionWeightProfilesService.create(
      createPositionWeightProfileDto,
    )
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar un perfil de peso por posición' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_profile: number,
    @Body() updatePositionWeightProfileDto: UpdatePositionWeightProfileDto,
  ) {
    return this.positionWeightProfilesService.update(
      id_profile,
      updatePositionWeightProfileDto,
    )
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un perfil de peso por posición' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_profile: number) {
    return this.positionWeightProfilesService.delete(id_profile)
  }
}
