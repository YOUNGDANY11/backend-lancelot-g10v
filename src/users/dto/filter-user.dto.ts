import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class FilterUserDto{
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?:number = 1

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?:number = 10

    @IsOptional()
    @IsString()
    name?:string

    @IsOptional()
    @IsString()
    lastname?:string

    @IsOptional()
    @IsString()
    email?:string
}