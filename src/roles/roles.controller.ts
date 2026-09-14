import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles')
@ApiInternalServerErrorResponse({ description: 'Error interno no controlado.' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear rol', description: 'Endpoint scaffold público; el DTO actual no define campos y el servicio devuelve texto.' }) @ApiBody({ type: CreateRoleDto }) @ApiResponse({ status: 201, type: String })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles', description: 'Endpoint scaffold público que devuelve texto.' }) @ApiResponse({ status: 200, type: String })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar rol', description: 'Endpoint scaffold público que devuelve texto.' }) @ApiParam({ name: 'id', type: Number, example: 1 }) @ApiResponse({ status: 200, type: String })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar rol', description: 'Endpoint scaffold público; el DTO actual no define campos y el servicio devuelve texto.' }) @ApiParam({ name: 'id', type: Number, example: 1 }) @ApiBody({ type: UpdateRoleDto }) @ApiResponse({ status: 200, type: String })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar rol', description: 'Endpoint scaffold público que devuelve texto.' }) @ApiParam({ name: 'id', type: Number, example: 1 }) @ApiResponse({ status: 200, type: String })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
