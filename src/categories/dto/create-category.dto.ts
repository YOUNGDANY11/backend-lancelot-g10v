import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name:string
    
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    min_age:number
    
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    max_age:number
    
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    current_year:number


}
