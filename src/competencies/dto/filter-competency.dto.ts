import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, Min } from "class-validator";

export class FilterCompetency{
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
    @Type(() => Date)
    @IsDate()
    start_date?:Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    finish_date?:Date

   
}