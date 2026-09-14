import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { FilterMatchDto } from './dto/filter-match.dto';
import { filter } from 'rxjs';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAll(@Query() filters:FilterMatchDto){
    return this.matchesService.findAll(filters)
  }
  
  @Get('id/:id')
  findOneById(@Param('id', ParseIntPipe) id_match:number){
    return this.matchesService.getById(id_match)
  }

  @Post()
  create(@Body() createMatchDto:CreateMatchDto){
    return this.matchesService.create(createMatchDto)
  }

  @Put('id/:id')
  update(@Param('id', ParseIntPipe) id_match:number, @Body() updateMatchDto:UpdateMatchDto){
    return this.matchesService.update(id_match,updateMatchDto)
  }

  @Delete('id/:id')
  delete(@Param('id', ParseIntPipe) id_match:number){
    return this.matchesService.delete(id_match)
  }
}
