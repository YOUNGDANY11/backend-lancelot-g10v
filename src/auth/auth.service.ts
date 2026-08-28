import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService:UsersService,
    private readonly jwtService:JwtService
  ){}

  private buildToken(id_user:number,id_role:number,email:string){
    const payload = {id:id_user,id_role,email}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async register(registerUserDto:RegisterUserDto){
    const user = await this.usersService.create(registerUserDto)
    return user
  }


  async login(loginUserDto:LoginUserDto){
    const user = await this.usersService.findOneByEmail(loginUserDto.email)
    if(!user) throw new UnauthorizedException({status:'Error',mensaje:'Este correo no esta asociado a ninguna cuenta'})
    
    const isMatch = bcrypt.compare(loginUserDto.password,user.password)
    if(!isMatch) throw new UnauthorizedException({status:'Error',mensaje:'Contraseña incorrecta'})

    return {
      status:'Success',
      mensaje:'Inicio de sesion exitoso',
      token: this.buildToken(user.id_user,user.id_role,user.email)
    }
  }
}
