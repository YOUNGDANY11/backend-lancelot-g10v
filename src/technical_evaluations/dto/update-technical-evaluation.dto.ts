import { PartialType } from '@nestjs/swagger'
import { CreateTechnicalEvaluationDto } from './create-technical-evaluation.dto'

export class UpdateTechnicalEvaluationDto extends PartialType(
  CreateTechnicalEvaluationDto,
) {}
