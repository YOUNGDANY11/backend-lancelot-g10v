import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { AthletesInCategoriesService } from './athletes_in_categories.service';
import { CreateAthletesInCategoryDto } from './dto/create-athletes_in_category.dto';
import { UpdateAthletesInCategoryDto } from './dto/update-athletes_in_category.dto';
import { FilterAthInCat } from './dto/filters-ath_in_cat.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('athletes-in-categories')
export class AthletesInCategoriesController {
  constructor(private readonly athletesInCategoriesService: AthletesInCategoriesService) {}

  @Roles('ADMIN','ENTRENADOR')
  @Get()
  findAll(@Query()filters:FilterAthInCat){
    return this.athletesInCategoriesService.findAll(filters)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Get('id/:id')
  findOneById(@Param('id',ParseIntPipe) id_ath_cat:number){
    return this.athletesInCategoriesService.getById(id_ath_cat)
  }

  @Roles('DEPORTISTA')
  @Get('me')
  findMyCategories(@GetUser('id_user')id_user:number){
    return this.athletesInCategoriesService.getByIdUser(id_user)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Post()
  create(@Body() createAthletesInCategoryDto:CreateAthletesInCategoryDto){
    return this.athletesInCategoriesService.create(createAthletesInCategoryDto)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Put('id/:id')
  update(@Param('id',ParseIntPipe) id_ath_cat:number, @Body() updateAthletesInCategoryDto:UpdateAthletesInCategoryDto){
    return this.athletesInCategoriesService.update(id_ath_cat,updateAthletesInCategoryDto)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_ath_cat:number){
    return this.athletesInCategoriesService.delete(id_ath_cat)
  }
}
