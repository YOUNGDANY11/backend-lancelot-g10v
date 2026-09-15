import { PartialType } from '@nestjs/swagger'
import { CreatePhysicalEvaluationDto } from './create-physical-evaluation.dto'

export class UpdatePhysicalEvaluationDto extends PartialType(CreatePhysicalEvaluationDto){}
