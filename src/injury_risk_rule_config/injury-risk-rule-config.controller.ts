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
import { ResponseInjuryRiskRuleConfigDto } from './dto/response-injury-risk-rule-config.dto'
import { UpdateInjuryRiskRuleConfigDto } from './dto/update-injury-risk-rule-config.dto'
import { InjuryRiskRuleConfigService } from './injury-risk-rule-config.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Configuración de reglas de riesgo de lesión')
@ApiBearerAuth('bearerAuth')
@Controller('injury-risk-rule-config')
export class InjuryRiskRuleConfigController {
  constructor(
    private readonly injuryRiskRuleConfigService: InjuryRiskRuleConfigService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR', 'ENCARGADO_SALUD')
  @Get()
  @ApiOperation({
    summary: 'Consultar la configuración vigente de las reglas de riesgo de lesión',
  })
  @ApiOkResponse({ type: ResponseInjuryRiskRuleConfigDto })
  getActive() {
    return this.injuryRiskRuleConfigService.getActiveResponse()
  }

  @Roles('ADMIN', 'DIRECTOR_TECNICO')
  @Put()
  @ApiOperation({
    summary:
      'Ajustar los umbrales de las reglas de riesgo de lesión (editable por el club, sin tocar código)',
  })
  @ApiOkResponse({ type: ResponseInjuryRiskRuleConfigDto })
  update(@Body() updateInjuryRiskRuleConfigDto: UpdateInjuryRiskRuleConfigDto) {
    return this.injuryRiskRuleConfigService.update(updateInjuryRiskRuleConfigDto)
  }
}
