import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateAthletesInCategoryDto {
    @IsNotEmpty()
    @Type(()=> Number)
    id_user:number

    @IsNotEmpty()
    @Type(()=> Number)
    id_category:number

}
