import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
import { FilterFatigueAlertDto } from './dto/filter-fatigue-alert.dto'
import { ResponseFatigueAlertDto } from './dto/response-fatigue-alert.dto'
import { UpdateFatigueAlertDto } from './dto/update-fatigue-alert.dto'
import { FatigueAlertsService } from './fatigue-alerts.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'ENCARGADO_SALUD')
@ApiTags('Alertas de fatiga')
@ApiBearerAuth('bearerAuth')
@Controller('fatigue-alerts')
export class FatigueAlertsController {
  constructor(private readonly fatigueAlertsService: FatigueAlertsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar alertas de fatiga (ej. ?status=open)' })
  @ApiQuery({ type: FilterFatigueAlertDto })
  findAll(@Query() filters: FilterFatigueAlertDto) {
    return this.fatigueAlertsService.findAll(filters)
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una alerta de fatiga por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseFatigueAlertDto })
  getById(@Param('id', ParseIntPipe) id_alert: number) {
    return this.fatigueAlertsService.getById(id_alert)
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Marcar una alerta como revisada o descartada' })
  @ApiParam({ name: 'id', type: Number })
  updateStatus(
    @Param('id', ParseIntPipe) id_alert: number,
    @Body() updateFatigueAlertDto: UpdateFatigueAlertDto,
  ) {
    return this.fatigueAlertsService.updateStatus(
      id_alert,
      updateFatigueAlertDto,
    )
  }
}
