import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseDto {
  @ApiProperty({ example: 'Success' }) status: string
  @ApiProperty({ example: 'Inicio de sesion exitoso' }) mensaje: string
  @ApiProperty({
    example: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refresh_token: 'k3n2...base64url...',
    },
  })
  token: { access_token: string; refresh_token: string }
}
