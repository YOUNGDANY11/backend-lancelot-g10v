import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateAthletesInCategoryDto {
    @IsNotEmpty()
    @Type(()=> Number)
    @IsInt()
    id_user:number

    @IsNotEmpty()
    @Type(()=> Number)
    @IsInt()
    id_category:number

}
