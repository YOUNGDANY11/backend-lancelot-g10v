import { AthletesInCategory } from "src/athletes_in_categories/entities/athletes_in_category.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id_user:number

    @Column({nullable:false})
    id_role:number

    @Column({nullable:true})
    id_ath_cat:number

    @Column({nullable:false,length:100})
    name:string

    @Column({nullable:false,length:100})
    lastname:string

    @Column({nullable:false,length:150})
    email:string

    @Column({nullable:false,length:255})
    password:string

    @CreateDateColumn({type:'timestamptz'})
    created_at:Date

    @UpdateDateColumn({type:'timestamptz'})
    updated_at:Date

    @ManyToOne(() => Role, role => role.user)
    @JoinColumn({name:'id_role'})
    role:Role
    
    @OneToMany(() => AthletesInCategory, athletesInCategory => athletesInCategory.user)
    @JoinColumn({name:'id_ath_cat'})
    athletesInCategory:AthletesInCategory[]
}
