import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterMatchDto{
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({ description: 'Página a consultar.', example: 1, minimum: 1, default: 1 }) page?:number = 1

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({ description: 'Registros por página.', example: 10, minimum: 1, default: 10 }) limit?:number = 10

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({example: 1 }) id_category?:number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({example: 1 }) id_competency?:number

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Texto a buscar nombre de la categoria.', example: 'SUB-20' }) name_category?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Texto a buscar nombre de la competencia.', example: 'LIGA DE BOGOTA' }) name_competency?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Texto a buscar locasion del partido.', example: 'Cayetano' }) location?:string
}
