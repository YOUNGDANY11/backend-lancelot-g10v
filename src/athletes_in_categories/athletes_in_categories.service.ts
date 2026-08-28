import { Injectable } from '@nestjs/common';
import { CreateAthletesInCategoryDto } from './dto/create-athletes_in_category.dto';
import { UpdateAthletesInCategoryDto } from './dto/update-athletes_in_category.dto';

@Injectable()
export class AthletesInCategoriesService {
  create(createAthletesInCategoryDto: CreateAthletesInCategoryDto) {
    return 'This action adds a new athletesInCategory';
  }

  findAll() {
    return `This action returns all athletesInCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} athletesInCategory`;
  }

  update(id: number, updateAthletesInCategoryDto: UpdateAthletesInCategoryDto) {
    return `This action updates a #${id} athletesInCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} athletesInCategory`;
  }
}
