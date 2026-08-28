import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id_role:number

    @Column({nullable:false,length:50})
    name:string

    @Column({nullable:false,length:50})
    code:string

    @OneToMany(() => User, user => user.role)
    user:User[]
}
