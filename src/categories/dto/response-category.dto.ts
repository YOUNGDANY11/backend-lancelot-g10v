import { ApiProperty } from '@nestjs/swagger';

export class ResponseCategoryDto {
  @ApiProperty({ example: 1 }) id_category: number;
  @ApiProperty({ example: 'Sub-15' }) name: string;
  @ApiProperty({ example: 13 }) min_age: number;
  @ApiProperty({ example: 15 }) max_age: number;
  @ApiProperty({ example: 2026 }) current_year: number;
  @ApiProperty({ type: String, format: 'date-time', example: '2026-01-15T12:00:00.000Z' }) created_at: Date;
  @ApiProperty({ type: String, format: 'date-time', example: '2026-01-15T12:00:00.000Z' }) updated_at: Date;
}
