import { PartialType } from '@nestjs/swagger'
import { CreateMatchStatisticDto } from './create-match-statistic.dto'

export class UpdateMatchStatisticDto extends PartialType(
  CreateMatchStatisticDto,
) {}
