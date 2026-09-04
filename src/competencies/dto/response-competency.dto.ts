import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseCompetencyDto {
  @ApiProperty({ example: 1 }) id_competency: number;
  @ApiProperty({ example: 'Torneo regional' }) name: string;
  @ApiPropertyOptional({ example: 'Competencia regional anual.' }) description?: string;
  @ApiProperty({ type: String, format: 'date-time', example: '2026-03-01T00:00:00.000Z' }) start_date: Date;
  @ApiPropertyOptional({ type: String, format: 'date-time', example: '2026-03-30T00:00:00.000Z', nullable: true }) finish_date?: Date;
  @ApiProperty({ example: 2026 }) current_year: number;
  @ApiProperty({ type: String, format: 'date-time', example: '2026-01-15T12:00:00.000Z' }) created_at: Date;
  @ApiProperty({ type: String, format: 'date-time', example: '2026-01-15T12:00:00.000Z' }) updated_at: Date;
}
