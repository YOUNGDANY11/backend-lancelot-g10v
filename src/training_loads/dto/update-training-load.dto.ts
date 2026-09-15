import { PartialType } from '@nestjs/swagger'
import { CreateTrainingLoadDto } from './create-training-load.dto'

export class UpdateTrainingLoadDto extends PartialType(
  CreateTrainingLoadDto,
) {}
