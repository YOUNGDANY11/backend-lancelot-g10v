import { Expose, Transform } from "class-transformer";

export class ResponseAthInCat{
    @Expose()
    id_user:number

    @Expose()
    id_ath_cat:number

    @Expose()
    @Transform(({obj}) => obj.user?.name)
    name:string

    @Expose()
    @Transform(({obj}) => obj.user?.lastname)
    lastname:string

    @Expose()
    created_at:Date

    @Expose()
    updated_at:Date
}