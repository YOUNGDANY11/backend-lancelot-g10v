import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMatchDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description:
      'Identificador de la competencia a la que pertenece el partido.',
    example: 1,
    minimum: 1,
  })
  id_competency: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Identificador de la categoría que disputa el partido.',
    example: 2,
    minimum: 1,
  })
  id_category: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Fecha programada del partido.',
    example: '2026-03-15',
    format: 'date',
  })
  date: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Hora programada del partido en formato de 24 horas.',
    example: '15:30:00',
    format: 'time',
  })
  time: string

  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  @ApiProperty({
    description: 'Lugar donde se jugará el partido.',
    example: 'Estadio Cayetano Cañizares',
    minLength: 4,
    maxLength: 100,
  })
  location: string
}
