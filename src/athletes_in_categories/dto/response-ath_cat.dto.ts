import { Expose, Transform } from "class-transformer";

export class ResponseAthInCat{
    @Expose()
    id_user:number

    @Expose()
    id_ath_cat:number

    @Expose()
    @Transform(({obj}) => obj.category?.id_category)
    id_category:number

    @Expose()
    @Transform(({obj}) => obj.category?.name)
    category_name:string

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