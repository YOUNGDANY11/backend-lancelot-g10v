import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(2,100)
    name:string
    
    @IsString()
    @IsNotEmpty()
    @Length(2,100)
    lastname:string

    @IsEmail()
    @IsNotEmpty()
    @Length(8,150)
    email:string

    @IsString()
    @IsNotEmpty()
    @Length(6,255)
    password:string
}
