import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LoginResponseDto } from './dto/login-response.dto'
import {
  UserResponseDto,
  MessageResponseDto,
} from 'src/common/dto/api-response.dto'
import { JwtAuthGuard } from './guard/jwt-guard'
import { GetUser } from './decorators/get-user.decorator'

@Controller('auth')
@ApiTags('Autenticación')
@ApiInternalServerErrorResponse({ description: 'Error interno no controlado.' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Valida credenciales y devuelve un access token y un refresh token.',
  })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'El cuerpo no supera la validación.' })
  @ApiUnauthorizedResponse({
    description: 'El correo no existe o la contraseña es incorrecta.',
  })
  login(@Body() loginUserDto: LoginUserDto, @Req() req: Request) {
    return this.authService.login(
      loginUserDto,
      req.ip,
      req.headers['user-agent'],
    )
  }

  @Post('/register')
  @ApiOperation({
    summary: 'Registrar un usuario',
    description: 'Crea un usuario con rol 3 asignado por el servicio.',
  })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({
    description:
      'El correo ya está asociado a un usuario o el cuerpo no es válido.',
  })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }

  @Post('/refresh')
  @ApiOperation({
    summary: 'Renovar tokens',
    description:
      'Rota el refresh token y devuelve un nuevo access token y refresh token. Si el refresh token ya fue usado o revocado, se cierran todas las sesiones del usuario por seguridad.',
  })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'El cuerpo no supera la validación.' })
  @ApiUnauthorizedResponse({
    description: 'El refresh token es inválido, expiró o ya fue usado.',
  })
  refresh(@Body() refreshTokenDto: RefreshTokenDto, @Req() req: Request) {
    return this.authService.refresh(
      refreshTokenDto,
      req.ip,
      req.headers['user-agent'],
    )
  }

  @Post('/logout')
  @ApiOperation({
    summary: 'Cerrar sesión',
    description:
      'Revoca el refresh token indicado (una sola sesión/dispositivo).',
  })
  @ApiOkResponse({ type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'El cuerpo no supera la validación.' })
  logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.logout(refreshTokenDto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Post('/logout-all')
  @ApiOperation({
    summary: 'Cerrar todas las sesiones',
    description:
      'Revoca todos los refresh tokens activos del usuario autenticado (todos los dispositivos).',
  })
  @ApiOkResponse({ type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT ausente, inválido o expirado.' })
  logoutAll(@GetUser('id_user') id_user: number) {
    return this.authService.logoutAll(id_user)
  }
}
