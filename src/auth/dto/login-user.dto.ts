import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto{
    @IsEmail()
    @IsNotEmpty()
    @Length(8,150)
    email:string
    
    @IsString()
    @IsNotEmpty()
    @Length(6,255)
    password:string
}