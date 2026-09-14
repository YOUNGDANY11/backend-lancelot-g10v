import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @ApiProperty({
    description: 'Nombres del usuario.',
    example: 'Juan',
    minLength: 2,
    maxLength: 100,
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @ApiProperty({
    description: 'Apellidos del usuario.',
    example: 'Pérez',
    minLength: 2,
    maxLength: 100,
  })
  lastname: string

  @IsEmail()
  @IsNotEmpty()
  @Length(8, 150)
  @ApiProperty({
    description: 'Correo electrónico único.',
    example: 'juan.perez@example.com',
    format: 'email',
    minLength: 8,
    maxLength: 150,
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  @ApiProperty({
    description: 'Contraseña de acceso.',
    example: 'Secreta123',
    minLength: 6,
    maxLength: 255,
    format: 'password',
  })
  password: string
}
