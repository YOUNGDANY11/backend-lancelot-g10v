import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { DevelopmentObjectiveStatus } from '../entities/development-objective.entity'

export class CreateDevelopmentObjectiveDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 7 })
  id_user: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  id_season: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Mejorar la definición con pierna izquierda' })
  description: string

  @IsDateString()
  @ApiProperty({ example: '2026-06-30', format: 'date' })
  target_date: string

  @IsOptional()
  @IsEnum(DevelopmentObjectiveStatus)
  @ApiPropertyOptional({
    enum: DevelopmentObjectiveStatus,
    default: DevelopmentObjectiveStatus.OPEN,
  })
  status?: DevelopmentObjectiveStatus

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 2 })
  set_by: number
}
