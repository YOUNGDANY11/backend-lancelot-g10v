import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Put } from '@nestjs/common';
import { AthletesInCompetenciesService } from './athletes_in_competencies.service';
import { CreateAthletesInCompetencyDto } from './dto/create-athletes_in_competency.dto';
import { UpdateAthletesInCompetencyDto } from './dto/update-athletes_in_competency.dto';
import { FilterAthInComp } from './dto/filter-athletes_in_competencies.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';


@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('athletes-in-competencies')
export class AthletesInCompetenciesController {
  constructor(private readonly athletesInCompetenciesService: AthletesInCompetenciesService) {}
  

  @Get()
  findAll(@Query()filters:FilterAthInComp){
    return this.athletesInCompetenciesService.findAll(filters)
  }

  @Get('id/:id')
  findOneById(@Param('id',ParseIntPipe) id_ath_comp:number){
    return this.athletesInCompetenciesService.getById(id_ath_comp)
  }

  @Get('me')
  findOneByUserId(@GetUser('id_user') id_user:number){
    return this.athletesInCompetenciesService.getByUserId(id_user)
  }

  @Post()
  create(@Body() createAthletesInCompetencyDto:CreateAthletesInCompetencyDto){
    return this.athletesInCompetenciesService.create(createAthletesInCompetencyDto)
  }

  @Put('id/:id')
  update(@Param('id',ParseIntPipe) id_ath_comp:number, @Body() updateAthletesInCompetencyDto:UpdateAthletesInCompetencyDto){
    return this.athletesInCompetenciesService.update(id_ath_comp,updateAthletesInCompetencyDto)
  }

  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_ath_comp:number){
    return this.athletesInCompetenciesService.delete(id_ath_comp)
  }
}
