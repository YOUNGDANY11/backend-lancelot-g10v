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
import { CreateParentalConsentDto } from './dto/create-parental-consent.dto'
import { FilterParentalConsentDto } from './dto/filter-parental-consent.dto'
import { ResponseParentalConsentDto } from './dto/response-parental-consent.dto'
import { UpdateParentalConsentDto } from './dto/update-parental-consent.dto'
import { ParentalConsentsService } from './parental-consents.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Consentimientos parentales')
@ApiBearerAuth('bearerAuth')
@Controller('parental-consents')
export class ParentalConsentsController {
  constructor(
    private readonly parentalConsentsService: ParentalConsentsService,
  ) {}

  @Roles('ADMIN', 'ENCARGADO_SALUD')
  @Get()
  @ApiOperation({ summary: 'Listar consentimientos parentales' })
  @ApiQuery({ type: FilterParentalConsentDto })
  findAll(@Query() filters: FilterParentalConsentDto) {
    return this.parentalConsentsService.findAll(filters)
  }

  @Roles('ADMIN', 'ENCARGADO_SALUD')
  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar un consentimiento parental por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ResponseParentalConsentDto })
  getById(@Param('id', ParseIntPipe) id_consent: number) {
    return this.parentalConsentsService.getById(id_consent)
  }

  @Roles('ADMIN', 'ENCARGADO_SALUD')
  @Post()
  @ApiOperation({ summary: 'Registrar un consentimiento parental' })
  @ApiCreatedResponse({ type: ResponseParentalConsentDto })
  create(@Body() createParentalConsentDto: CreateParentalConsentDto) {
    return this.parentalConsentsService.create(createParentalConsentDto)
  }

  @Roles('ADMIN', 'ENCARGADO_SALUD')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar o aprobar un consentimiento parental' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id_consent: number,
    @Body() updateParentalConsentDto: UpdateParentalConsentDto,
  ) {
    return this.parentalConsentsService.update(
      id_consent,
      updateParentalConsentDto,
    )
  }

  @Roles('ADMIN', 'ENCARGADO_SALUD')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un consentimiento parental' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id_consent: number) {
    return this.parentalConsentsService.delete(id_consent)
  }
}
