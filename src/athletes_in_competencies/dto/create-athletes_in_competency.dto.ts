import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateAthletesInCompetencyDto {

    @IsNotEmpty()
    @Type(()=> Number)
    @IsInt()
    id_user:number

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    id_competency:number
}
