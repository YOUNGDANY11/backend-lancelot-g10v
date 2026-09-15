import { PartialType } from '@nestjs/swagger'
import { CreateParentalConsentDto } from './create-parental-consent.dto'

export class UpdateParentalConsentDto extends PartialType(
  CreateParentalConsentDto,
) {}
