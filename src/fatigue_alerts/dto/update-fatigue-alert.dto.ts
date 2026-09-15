import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { FatigueAlertStatus } from '../entities/fatigue-alert.entity'

export class UpdateFatigueAlertDto {
  @IsEnum(FatigueAlertStatus)
  @ApiProperty({ enum: FatigueAlertStatus, example: FatigueAlertStatus.REVIEWED })
  status: FatigueAlertStatus
}
