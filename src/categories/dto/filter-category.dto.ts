import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class FilterCategory{
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
    @Type(() => Number)
    @IsInt()
    current_year?:number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    min_age?:number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    max_age?:number
   
}