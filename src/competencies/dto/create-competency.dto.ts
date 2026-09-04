import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompetencyDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsOptional()
    @IsString()
    description?:string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    start_date:Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    finish?:Date
    
    @IsNotEmpty()
    @Type(() => Number)
    current_year:number
}
