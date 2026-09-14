import { Category } from "src/categories/entities/category.entity";
import { Competency } from "src/competencies/entities/competency.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('matches')
export class Match {
    @PrimaryGeneratedColumn()
    id_match:number

    @Column({nullable:false})
    id_competency:number

    @Column({nullable:false})
    id_category:number

    @Column({type:'date',nullable:false})
    date:string

    @Column({type:'time',nullable:false})
    time:string

    @Column({nullable:false})
    location:string

    @CreateDateColumn({type:'timestamptz'})
    created_at:Date

    @UpdateDateColumn({type:'timestamptz'})
    updated_at:Date

    @ManyToOne(() => Competency, competency => competency.match)
    @JoinColumn({name:'id_competency'})
    competency:Competency

    @ManyToOne(() => Category, category => category.match)
    @JoinColumn({name:'id_category'})
    category:Category
}
