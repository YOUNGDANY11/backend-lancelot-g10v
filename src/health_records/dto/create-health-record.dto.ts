import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator'
import { HealthRecordStatus } from '../entities/health-record.entity'

export class CreateHealthRecordDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 7 })
  id_user: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  @ApiProperty({ example: 'alergia' })
  condition_type: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Alergia a la penicilina' })
  description: string

  @IsBoolean()
  @ApiProperty({ example: false })
  restriction: boolean

  @IsOptional()
  @IsEnum(HealthRecordStatus)
  @ApiPropertyOptional({
    enum: HealthRecordStatus,
    default: HealthRecordStatus.ACTIVE,
  })
  status?: HealthRecordStatus

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 2 })
  registered_by: number
}
