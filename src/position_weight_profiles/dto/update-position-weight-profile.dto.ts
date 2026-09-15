import { PartialType } from '@nestjs/swagger'
import { CreatePositionWeightProfileDto } from './create-position-weight-profile.dto'

export class UpdatePositionWeightProfileDto extends PartialType(
  CreatePositionWeightProfileDto,
) {}
