import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Max, Min } from 'class-validator'

export class CreateTrainingLoadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  id_session: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 7 })
  id_user: number

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  @ApiProperty({ example: 7, minimum: 0, maximum: 10 })
  rpe: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 75 })
  duration_min: number
}
