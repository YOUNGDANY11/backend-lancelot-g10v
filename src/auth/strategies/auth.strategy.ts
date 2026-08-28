import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usersService:UsersService,
        private readonly configService:ConfigService
    ){
        const secret = configService.get<string>('JWT_SECRET')
        if(!secret) throw new Error('No esta registrada la JWT_SECRET en el .env')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:secret
        })
    }

    async validate(payload:any){
        const user = await this.usersService.findOneById(payload.id)
        if(!user) throw new UnauthorizedException({status:'Error',mensaje:'No esta autorizadao'})
        return user
    }
}