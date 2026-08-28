import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from './strategies/auth.strategy';

@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService) : JwtModuleOptions => {
        const secret = configService.get<string>('JWT_SECRET')
        if(!secret) throw new Error('No esta registrada la JWT_SECRET en el .env')
        return{
          secret,
          signOptions:{expiresIn:configService.get<string>('JWT_EXPIRES') as any}
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
