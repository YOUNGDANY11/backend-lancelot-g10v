import { Expose, Transform } from "class-transformer";

export class ResponseMatchDto{
    @Expose()
    id_match:number

    @Expose()
    id_competency:number

    @Expose()
    id_category:number

    @Expose()
    date:string

    @Expose()
    time:string

    @Expose()
    location:string

    @Expose()
    @Transform(({obj}) => obj.category?.name)
    name_category:string

    @Expose()
    @Transform(({obj}) => obj.competency?.name)
    name_competency:string

    @Expose()
    created_at:Date

    @Expose()
    updated_at:Date
}