import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { CompetenciesService } from './competencies.service';
import { CreateCompetencyDto } from './dto/create-competency.dto';
import { UpdateCompetencyDto } from './dto/update-competency.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { FilterCompetency } from './dto/filter-competency.dto';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('competencies')
export class CompetenciesController {
  constructor(private readonly competenciesService: CompetenciesService) {}

  @Roles('ADMIN','ENTRENADOR')
  @Get()
  findAll(@Query() filters:FilterCompetency){
    return this.competenciesService.findAll(filters)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Get('id/:id')
  findOneById(@Param('id', ParseIntPipe) id_competency:number){
    return this.competenciesService.getById(id_competency)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Post()
  creat(@Body()createCompetencyDto:CreateCompetencyDto){
    return this.competenciesService.create(createCompetencyDto)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Put('id/:id')
  update(@Param('id', ParseIntPipe) id_competency:number, @Body() updateCompetencyDto:UpdateCompetencyDto){
    return this.competenciesService.update(id_competency, updateCompetencyDto)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_competency:number){
    return this.competenciesService.delete(id_competency)
  }
}
