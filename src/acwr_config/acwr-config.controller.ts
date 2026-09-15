import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { AcwrConfigService } from './acwr-config.service'
import { ResponseAcwrThresholdDto } from './dto/response-acwr-threshold.dto'
import { UpdateAcwrThresholdDto } from './dto/update-acwr-threshold.dto'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Configuración de umbrales ACWR')
@ApiBearerAuth('bearerAuth')
@Controller('acwr-config')
export class AcwrConfigController {
  constructor(private readonly acwrConfigService: AcwrConfigService) {}

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'ENCARGADO_SALUD')
  @Get()
  @ApiOperation({ summary: 'Consultar los umbrales vigentes de ACWR' })
  @ApiOkResponse({ type: ResponseAcwrThresholdDto })
  getActive() {
    return this.acwrConfigService.getActiveResponse()
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO')
  @Put()
  @ApiOperation({
    summary:
      'Ajustar los umbrales de ACWR (editable por el club, sin tocar código)',
  })
  @ApiOkResponse({ type: ResponseAcwrThresholdDto })
  update(@Body() updateAcwrThresholdDto: UpdateAcwrThresholdDto) {
    return this.acwrConfigService.update(updateAcwrThresholdDto)
  }
}
