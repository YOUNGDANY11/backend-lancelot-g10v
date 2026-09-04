import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'Success' }) status: string;
  @ApiProperty({ example: 'Inicio de sesion exitoso' }) mensaje: string;
  @ApiProperty({ example: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } })
  token: { access_token: string };
}
