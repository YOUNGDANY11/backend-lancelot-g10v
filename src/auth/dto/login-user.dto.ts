import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(8, 150)
  @ApiProperty({
    description: 'Correo electrónico registrado.',
    example: 'juan.perez@example.com',
    format: 'email',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  @ApiProperty({
    description: 'Contraseña de acceso.',
    example: 'Secreta123',
    format: 'password',
  })
  password: string
}
