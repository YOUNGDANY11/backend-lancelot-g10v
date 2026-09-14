import { ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Identificador del rol asignado.',
    example: 3,
    minimum: 1,
  })
  id_role?: number
}
