import { PartialType } from '@nestjs/swagger'
import { CreateAthletesInCategoryDto } from './create-athletes_in_category.dto'

export class UpdateAthletesInCategoryDto extends PartialType(
  CreateAthletesInCategoryDto,
) {}
