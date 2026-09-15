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
import { CreateHealthRecordDto } from './dto/create-health-record.dto'
import { FilterHealthRecordDto } from './dto/filter-health-record.dto'
import { ResponseHealthRecordDto } from './dto/response-health-record.dto'
import { UpdateHealthRecordDto } from './dto/update-health-record.dto'
import { HealthRecordsService } from './health-records.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'ENCARGADO_SALUD')
@ApiTags('Registros de salud')
@ApiBearerAuth('bearerAuth')
@Controller('health-records')
export class HealthRecordsController {
  constructor(private readonly healthRecordsService: HealthRecordsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar registros de salud' })
  @ApiQuery({ type: FilterHealthRecordDto })
  findAll(@Query() filters: FilterHealthRecordDto) {
    return this.healthRecordsService.findAll(filters)
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar un registro de salud por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseHealthRecordDto })
  getById(@Param('id', ParseIntPipe) id_health: number) {
    return this.healthRecordsService.getById(id_health)
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un dato de salud' })
  @ApiCreatedResponse({ type: ResponseHealthRecordDto })
  create(@Body() createHealthRecordDto: CreateHealthRecordDto) {
    return this.healthRecordsService.create(createHealthRecordDto)
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar un registro de salud' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_health: number,
    @Body() updateHealthRecordDto: UpdateHealthRecordDto,
  ) {
    return this.healthRecordsService.update(id_health, updateHealthRecordDto)
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un registro de salud' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_health: number) {
    return this.healthRecordsService.delete(id_health)
  }
}
