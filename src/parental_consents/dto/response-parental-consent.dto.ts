import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { ParentalConsentStatus } from '../entities/parental-consent.entity'

export class ResponseParentalConsentDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_consent: number

  @Expose()
  @ApiProperty({ example: 7 })
  id_user: number

  @Expose()
  @Transform(({ obj }) =>
    `${obj.athlete?.name ?? ''} ${obj.athlete?.lastname ?? ''}`.trim(),
  )
  @ApiProperty({ example: 'Juan Pérez' })
  athlete_name: string

  @Expose()
  @ApiProperty({ example: 'Ana Pérez' })
  guardian_name: string

  @Expose()
  @ApiProperty({ example: '1020304050' })
  guardian_document: string

  @Expose()
  @ApiProperty({ example: 'madre' })
  guardian_relationship: string

  @Expose()
  @ApiProperty({ example: '2026-01-22T15:30:00.000Z', format: 'date-time' })
  signed_at: Date

  @Expose()
  @ApiPropertyOptional({
    example: 'https://files.vera-fc.co/consents/7.pdf',
    nullable: true,
  })
  document_url?: string | null

  @Expose()
  @ApiProperty({ enum: ParentalConsentStatus })
  status: ParentalConsentStatus

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date
}
