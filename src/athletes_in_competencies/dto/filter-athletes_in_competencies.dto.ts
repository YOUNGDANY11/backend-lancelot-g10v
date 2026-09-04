import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterAthInComp{
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({ example: 1, minimum: 1, default: 1 }) page?:number = 1

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({ example: 10, minimum: 1, default: 10 }) limit?:number = 10

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @ApiPropertyOptional({ example: 1 }) id_competency?:number

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'Juan' }) name?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'Pérez' }) lastname?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'Torneo regional' }) competency_name?:string
}
