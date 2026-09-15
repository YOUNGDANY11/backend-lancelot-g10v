import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator'

export class UpdateInjuryRiskRuleConfigDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @ApiPropertyOptional({
    example: 1.5,
    description: 'ACWR por encima del cual un día cuenta como sostenido',
  })
  sustained_acwr_threshold?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    example: 2,
    description: 'Días consecutivos con ACWR sostenido para disparar la regla',
  })
  sustained_acwr_min_days?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    example: 7,
    description: 'Ventana máxima (días hacia atrás) para buscar la racha de ACWR sostenido',
  })
  sustained_acwr_lookback_days?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  @ApiPropertyOptional({
    example: 8,
    description: 'RPE a partir del cual una sesión cuenta como de alta intensidad',
  })
  sustained_rpe_threshold?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    example: 3,
    description: 'Cantidad mínima de sesiones de alto RPE para disparar la regla',
  })
  sustained_rpe_min_sessions?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    example: 14,
    description: 'Ventana (días hacia atrás) para contar sesiones de alto RPE',
  })
  sustained_rpe_lookback_days?: number
}
