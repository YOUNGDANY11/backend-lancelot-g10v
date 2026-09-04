import { Expose, Transform } from "class-transformer";

export class ResponseAthInComp{
    @Expose()
    id_ath_comp:number

    @Expose()
    id_user:number

    @Expose()
    id_competency:number

    @Expose()
    @Transform(({obj}) => obj.user?.name)
    name:string

    @Expose()
    @Transform(({obj}) => obj.user?.lastname)
    lastname:string

    @Expose()
    @Transform(({obj}) => obj.competency?.name)
    name_competency:string

    @Expose()
    @Transform(({obj}) => obj.competency?.current_year)
    current_year_competency:number

    @Expose()
    created_at:Date

    @Expose()
    updated_at:Date
}