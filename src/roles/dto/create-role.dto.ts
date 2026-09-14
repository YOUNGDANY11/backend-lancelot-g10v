import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty({ example: 'ENCARGADO_SALUD' })
  name: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[A-Z_]+$/)
  @ApiProperty({ example: 'ENCARGADO_SALUD' })
  code: string
}
