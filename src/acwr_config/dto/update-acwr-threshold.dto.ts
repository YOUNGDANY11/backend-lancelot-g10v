import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class UpdateAcwrThresholdDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiPropertyOptional({ example: 0.8, description: 'Por debajo de este valor, riesgo alto (destreno)' })
  low_min?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiPropertyOptional({ example: 1.3, description: 'Límite superior de la zona segura (riesgo bajo)' })
  low_max?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiPropertyOptional({ example: 1.5, description: 'Límite superior de la zona de vigilancia (riesgo medio); por encima, riesgo alto' })
  medium_max?: number
}
