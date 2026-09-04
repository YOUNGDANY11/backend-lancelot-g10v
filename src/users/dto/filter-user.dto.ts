import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterUserDto{
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
    @IsString()
    @ApiPropertyOptional({ description: 'Texto a buscar en los nombres.', example: 'Juan' }) name?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Texto a buscar en los apellidos.', example: 'Pérez' }) lastname?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Texto a buscar en el correo.', example: 'juan@example.com' }) email?:string
}
