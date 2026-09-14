import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
  @ApiProperty({
    description: 'Número total de registros que cumplen el filtro.',
    example: 25,
  })
  total: number

  @ApiProperty({ description: 'Página actual.', example: 1, minimum: 1 })
  page: number

  @ApiProperty({
    description: 'Cantidad de registros por página.',
    example: 10,
    minimum: 1,
  })
  limit: number

  @ApiProperty({ description: 'Cantidad total de páginas.', example: 3 })
  totalPages: number
}
