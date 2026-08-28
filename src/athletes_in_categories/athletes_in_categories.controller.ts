import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AthletesInCategoriesService } from './athletes_in_categories.service';
import { CreateAthletesInCategoryDto } from './dto/create-athletes_in_category.dto';
import { UpdateAthletesInCategoryDto } from './dto/update-athletes_in_category.dto';

@Controller('athletes-in-categories')
export class AthletesInCategoriesController {
  constructor(private readonly athletesInCategoriesService: AthletesInCategoriesService) {}

  @Post()
  create(@Body() createAthletesInCategoryDto: CreateAthletesInCategoryDto) {
    return this.athletesInCategoriesService.create(createAthletesInCategoryDto);
  }

  @Get()
  findAll() {
    return this.athletesInCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.athletesInCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAthletesInCategoryDto: UpdateAthletesInCategoryDto) {
    return this.athletesInCategoriesService.update(+id, updateAthletesInCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.athletesInCategoriesService.remove(+id);
  }
}
