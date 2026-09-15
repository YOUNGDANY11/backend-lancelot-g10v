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
import { CreateInjuryDto } from './dto/create-injury.dto'
import { FilterInjuryDto } from './dto/filter-injury.dto'
import { ResponseInjuryDto } from './dto/response-injury.dto'
import { UpdateInjuryDto } from './dto/update-injury.dto'
import { InjuriesService } from './injuries.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'ENCARGADO_SALUD', 'ENTRENADOR')
@ApiTags('Lesiones')
@ApiBearerAuth('bearerAuth')
@Controller('injuries')
export class InjuriesController {
  constructor(private readonly injuriesService: InjuriesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar lesiones' })
  @ApiQuery({ type: FilterInjuryDto })
  findAll(@Query() filters: FilterInjuryDto) {
    return this.injuriesService.findAll(filters)
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una lesión por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseInjuryDto })
  getById(@Param('id', ParseIntPipe) id_injury: number) {
    return this.injuriesService.getById(id_injury)
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una lesión' })
  @ApiCreatedResponse({ type: ResponseInjuryDto })
  create(@Body() createInjuryDto: CreateInjuryDto) {
    return this.injuriesService.create(createInjuryDto)
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar una lesión' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_injury: number,
    @Body() updateInjuryDto: UpdateInjuryDto,
  ) {
    return this.injuriesService.update(id_injury, updateInjuryDto)
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar una lesión' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_injury: number) {
    return this.injuriesService.delete(id_injury)
  }
}
