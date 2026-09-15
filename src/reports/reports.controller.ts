import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { ReportsService } from './reports.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
@ApiTags('Reportes')
@ApiBearerAuth('bearerAuth')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('season-comparison/:id_user')
  @ApiOperation({
    summary:
      'Comparar la evolución del índice de progreso de un deportista entre todas sus temporadas',
  })
  @ApiParam({ name: 'id_user', type: Number })
  seasonComparison(@Param('id_user', ParseIntPipe) id_user: number) {
    return this.reportsService.getSeasonComparison(id_user)
  }

  @Get('season-summary/:id_user/:id_season')
  @ApiOperation({
    summary: 'Resumen completo de un deportista en una temporada específica',
  })
  @ApiParam({ name: 'id_user', type: Number })
  @ApiParam({ name: 'id_season', type: Number })
  seasonSummary(
    @Param('id_user', ParseIntPipe) id_user: number,
    @Param('id_season', ParseIntPipe) id_season: number,
  ) {
    return this.reportsService.getSeasonSummary(id_user, id_season)
  }
}
