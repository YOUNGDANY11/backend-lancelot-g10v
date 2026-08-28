import { PartialType } from '@nestjs/mapped-types';
import { CreateAthletesInCategoryDto } from './create-athletes_in_category.dto';

export class UpdateAthletesInCategoryDto extends PartialType(CreateAthletesInCategoryDto) {}
