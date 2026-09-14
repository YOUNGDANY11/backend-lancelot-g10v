import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Refresh token emitido en el login o en una renovación anterior.',
    example: 'k3n2...base64url...',
  })
  refresh_token: string
}
