import { PartialType } from '@nestjs/swagger'
import { CreateDevelopmentObjectiveDto } from './create-development-objective.dto'

export class UpdateDevelopmentObjectiveDto extends PartialType(
  CreateDevelopmentObjectiveDto,
) {}
