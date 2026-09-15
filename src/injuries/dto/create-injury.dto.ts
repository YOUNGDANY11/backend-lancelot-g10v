import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator'
import { InjurySeverity, InjuryStatus } from '../entities/injury.entity'

export class CreateInjuryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 7 })
  id_user: number

  @IsDateString()
  @ApiProperty({ example: '2026-03-02', format: 'date' })
  injury_date: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ example: 'tobillo' })
  body_part: string

  @IsEnum(InjurySeverity)
  @ApiProperty({ enum: InjurySeverity, example: InjurySeverity.LEVE })
  severity: InjurySeverity

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Esguince grado I' })
  diagnosis?: string

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2026-03-16', format: 'date' })
  recovery_date?: string

  @IsOptional()
  @IsEnum(InjuryStatus)
  @ApiPropertyOptional({ enum: InjuryStatus, default: InjuryStatus.ACTIVE })
  status?: InjuryStatus

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 2 })
  registered_by: number
}
