import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, } from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { CreateSeasonDto } from './dto/create-season.dto'
import { FilterSeasonDto } from './dto/filter-season.dto'
import { ResponseSeasonDto } from './dto/response-season.dto'
import { UpdateSeasonDto } from './dto/update-season.dto'
import { SeasonsService } from './seasons.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Temporadas')
@ApiBearerAuth('bearerAuth')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Roles('ADMIN', 'DIRECTOR_TECNICO')
  @Get()
  @ApiOperation({ summary: 'Listar temporadas' })
  @ApiQuery({ type: FilterSeasonDto })
  findAll(@Query() filters: FilterSeasonDto) {
    return this.seasonsService.findAll(filters)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una temporada por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseSeasonDto })
  findOne(@Param('id', ParseIntPipe) id_season: number) {
    return this.seasonsService.getById(id_season)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO')
  @Post()
  @ApiOperation({ summary: 'Crear una temporada' })
  @ApiCreatedResponse({ type: ResponseSeasonDto })
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.create(createSeasonDto)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar una temporada' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_season: number,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ) {
    return this.seasonsService.update(id_season, updateSeasonDto)
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar una temporada' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_season: number) {
    return this.seasonsService.delete(id_season)
  }
}
