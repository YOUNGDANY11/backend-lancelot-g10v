import { Exclude, Expose, Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto{
    @Expose()
    @ApiProperty({ example: 1 }) id_user:number

    @Expose()
    @ApiProperty({ example: 3 }) id_role:number

    @Expose()
    @Transform(({obj}) => obj.athletesInCategory?.map(ath => ath.id_ath_cat) ?? [])
    @ApiProperty({ description: 'Identificadores de asignaciones a categorías.', type: Number, isArray: true, example: [4, 8] }) id_ath_cat:number[]

    @Expose()
    @ApiProperty({ example: 'Juan' }) name:string

    @Expose()
    @ApiProperty({ example: 'Pérez' }) lastname:string

    @Expose()
    @ApiProperty({ example: 'juan.perez@example.com', format: 'email' }) email:string

    @Expose()
    @Transform(({obj}) => obj.role?.name)
    @ApiProperty({ example: 'JUGADOR' }) role_name:string

    @Exclude()
    password:string

}
