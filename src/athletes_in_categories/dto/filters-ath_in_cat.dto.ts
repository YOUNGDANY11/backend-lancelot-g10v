import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class FilterAthInCat{
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
    @Type(() => Number)
    @IsInt()
    id_category?:number

    @IsOptional()
    @IsString()
    name?:string

    @IsOptional()
    @IsString()
    lastname?:string
}