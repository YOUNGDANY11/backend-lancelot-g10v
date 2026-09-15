import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ResponseAcwrThresholdDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_threshold: number

  @Expose()
  @ApiProperty({ example: 0.8 })
  low_min: number

  @Expose()
  @ApiProperty({ example: 1.3 })
  low_max: number

  @Expose()
  @ApiProperty({ example: 1.5 })
  medium_max: number

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
