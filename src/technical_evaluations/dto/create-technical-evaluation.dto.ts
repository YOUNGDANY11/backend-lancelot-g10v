import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { EvaluationDimension } from '../entities/technical-evaluation.entity'
import { Sport } from 'src/common/sport/sport-rules'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator'

export class CreateTechnicalEvaluationDto {
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

  @IsOptional()
  @IsEnum(EvaluationDimension, {
    message: 'La dimensión debe ser tecnica o tactica',
  })
  @ApiPropertyOptional({
    enum: EvaluationDimension,
    default: EvaluationDimension.TECNICA,
    description:
      'tecnica: dominio del balón (control, pase, remate…); tactica: comprensión del juego (posicionamiento, presión, rotaciones…)',
  })
  dimension?: EvaluationDimension

  @IsOptional()
  @IsEnum(Sport, { message: 'El deporte debe ser futbol o futbol_sala' })
  @ApiPropertyOptional({
    enum: Sport,
    description:
      'Deporte en el que se evaluó. Es obligatorio si el deportista juega fútbol y fútbol sala en la temporada; si juega solo uno, se toma ese.',
  })
  sport?: Sport

  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  @ApiProperty({ example: 'control_balon' })
  indicator: string

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(10)
  @ApiProperty({ example: 8.5, minimum: 1, maximum: 10 })
  score: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 2 })
  evaluator_id: number

  @IsDateString()
  @ApiProperty({ example: '2026-01-22', format: 'date' })
  eval_date: string
}
