import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator'
import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'
import { ParentalConsentStatus } from '../entities/parental-consent.entity'

export class CreateParentalConsentDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 7 })
  id_user: number

  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  @ApiProperty({ example: 'Ana Pérez' })
  guardian_name: string

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @ApiProperty({ example: '1020304050' })
  guardian_document: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  @ApiProperty({ example: 'madre' })
  guardian_relationship: string

  @IsDateString()
  @ApiProperty({ example: '2026-01-22T15:30:00.000Z', format: 'date-time' })
  signed_at: string

  @IsOptional()
  @IsUrl({ require_tld: false })
  @Length(1, 255)
  @ApiPropertyOptional({ example: 'https://files.vera-fc.co/consents/7.pdf' })
  document_url?: string

  @IsOptional()
  @IsEnum(ParentalConsentStatus)
  @ApiPropertyOptional({
    enum: ParentalConsentStatus,
    default: ParentalConsentStatus.PENDING,
  })
  status?: ParentalConsentStatus
}
