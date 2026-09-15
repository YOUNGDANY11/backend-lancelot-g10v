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
import { CreateTalentFlagDto } from './dto/create-talent-flag.dto'
import { FilterTalentFlagDto } from './dto/filter-talent-flag.dto'
import { ResponseTalentFlagDto } from './dto/response-talent-flag.dto'
import { UpdateTalentFlagDto } from './dto/update-talent-flag.dto'
import { TalentFlagsService } from './talent-flags.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DIRECTOR_TECNICO', 'ENTRENADOR')
@ApiTags('Señalizaciones de talento')
@ApiBearerAuth('bearerAuth')
@Controller('talent-flags')
export class TalentFlagsController {
  constructor(private readonly talentFlagsService: TalentFlagsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar señalizaciones de talento' })
  @ApiQuery({ type: FilterTalentFlagDto })
  findAll(@Query() filters: FilterTalentFlagDto) {
    return this.talentFlagsService.findAll(filters)
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar una señalización de talento por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseTalentFlagDto })
  getById(@Param('id', ParseIntPipe) id_flag: number) {
    return this.talentFlagsService.getById(id_flag)
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una señalización de talento' })
  create(@Body() createTalentFlagDto: CreateTalentFlagDto) {
    return this.talentFlagsService.create(createTalentFlagDto)
  }

  @Put('id/:id')
  @ApiOperation({
    summary: 'Marcar una señalización de talento como revisada o descartada',
  })
  @ApiParam({ name: 'id', type: Number })
  updateStatus(
    @Param('id', ParseIntPipe) id_flag: number,
    @Body() updateTalentFlagDto: UpdateTalentFlagDto,
  ) {
    return this.talentFlagsService.updateStatus(id_flag, updateTalentFlagDto)
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar una señalización de talento' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_flag: number) {
    return this.talentFlagsService.delete(id_flag)
  }
}
