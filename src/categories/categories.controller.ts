import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategory } from './dto/filter-category.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles('ADMIN','ENTRENADOR')
  @Get()
  findAll(@Query() filters:FilterCategory){
    return this.categoriesService.findAll(filters)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Get('id/:id')
  findOneById(@Param('id', ParseIntPipe) id_category:number){
    return this.categoriesService.getById(id_category)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Post()
  creat(@Body()createCategoryDto:CreateCategoryDto){
    return this.categoriesService.create(createCategoryDto)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Put('id/:id')
  update(@Param('id', ParseIntPipe) id_category:number, @Body() updateCategoryDto:UpdateCategoryDto){
    return this.categoriesService.update(id_category, updateCategoryDto)
  }

  @Roles('ADMIN','ENTRENADOR')
  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_category:number){
    return this.categoriesService.delete(id_category)
  }
}
