import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateMatchDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    id_competency:number

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    id_category:number

    @IsNotEmpty()
    @IsString()
    date:string

    @IsNotEmpty()
    @IsString()
    time:string

    @IsNotEmpty()
    @IsString()
    @Length(4,100)
    location:string

}
