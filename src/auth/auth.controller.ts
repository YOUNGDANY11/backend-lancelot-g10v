import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from 'src/common/dto/api-response.dto';

@Controller('auth')
@ApiTags('Autenticación')
@ApiInternalServerErrorResponse({ description: 'Error interno no controlado.' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Valida credenciales y devuelve un JWT.' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'El cuerpo no supera la validación.' })
  @ApiUnauthorizedResponse({ description: 'El correo no existe o la contraseña es incorrecta.' })
  login(@Body() loginUserDto:LoginUserDto){
    return this.authService.login(loginUserDto)
  }

  @Post('/register')
  @ApiOperation({ summary: 'Registrar un usuario', description: 'Crea un usuario con rol 3 asignado por el servicio.' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'El correo ya está asociado a un usuario o el cuerpo no es válido.' })
  register(@Body() registerUserDto:RegisterUserDto){
    return this.authService.register(registerUserDto)
  }
}
