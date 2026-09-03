import { Exclude, Expose, Transform } from "class-transformer";

export class ResponseUserDto{
    @Expose()
    id_user:number

    @Expose()
    id_role:number

    @Expose()
    @Transform(({obj}) => obj.athletesInCategory?.map(ath => ath.id_ath_cat) ?? [])
    id_ath_cat:number

    @Expose()
    name:string

    @Expose()
    lastname:string

    @Expose()
    email:string

    @Expose()
    @Transform(({obj}) => obj.role?.name)
    role_name:string

    @Exclude()
    password:string

}