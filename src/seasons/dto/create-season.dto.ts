import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { SeasonStatus } from '../entities/season.entity'

export class CreateSeasonDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ example: '2026-A' })
  name: string

  @IsDateString()
  @ApiProperty({ example: '2026-01-15', format: 'date' })
  start_date: string

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2026-06-30', format: 'date' })
  end_date?: string

  @IsOptional()
  @IsEnum(SeasonStatus)
  @ApiPropertyOptional({ enum: SeasonStatus, default: SeasonStatus.PLANNED })
  status?: SeasonStatus
}
