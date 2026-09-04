import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAthletesInCompetencyDto {

    @IsNotEmpty()
    @Type(()=> Number)
    @IsInt()
    @ApiProperty({ description: 'Identificador del usuario deportista.', example: 7, minimum: 1 }) id_user:number

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @ApiProperty({ description: 'Identificador de la competencia.', example: 1, minimum: 1 }) id_competency:number
}
