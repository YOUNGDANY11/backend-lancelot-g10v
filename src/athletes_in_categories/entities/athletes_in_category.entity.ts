import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('athletes_in_categories')
export class AthletesInCategory {
    @PrimaryGeneratedColumn()
    id_ath_cat:number

    @Column({nullable:false})
    id_user:number

    @Column({nullable:false})
    id_category:number

    @CreateDateColumn({type:'timestamptz'})
    created_at:Date

    @UpdateDateColumn({type:'timestamptz'})
    updated_at:Date
    
    @ManyToOne(() => User, user => user.athletesInCategory)
    @JoinColumn({name:'id_user'})
    user:User
}
