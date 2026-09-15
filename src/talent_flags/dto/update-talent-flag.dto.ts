import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { TalentFlagStatus } from '../entities/talent-flag.entity'

export class UpdateTalentFlagDto {
  @IsEnum(TalentFlagStatus)
  @ApiProperty({ enum: TalentFlagStatus, example: TalentFlagStatus.REVIEWED })
  status: TalentFlagStatus
}
