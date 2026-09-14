import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length, } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
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
    description: 'Correo electrónico único del usuario.',
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

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del usuario.',
    example: '2012-04-10',
    format: 'date',
  })
  birth_date?: string
}
