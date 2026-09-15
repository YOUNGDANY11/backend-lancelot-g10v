import { Category } from 'src/categories/entities/category.entity'
import { Season } from 'src/seasons/entities/season.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('athletes_in_categories')
export class AthletesInCategory {
  @PrimaryGeneratedColumn()
  id_ath_cat: number

  @Column({ nullable: false })
  id_user: number

  @Column({ nullable: false })
  id_category: number

  @Column({ nullable: true })
  id_season?: number | null

  @Column({ type: 'varchar', length: 30, nullable: true })
  position?: string | null

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date

  @ManyToOne(() => User, (user) => user.athletesInCategory)
  @JoinColumn({ name: 'id_user' })
  user: User

  @ManyToOne(() => Category, (category) => category.athletesInCategory)
  @JoinColumn({ name: 'id_category' })
  category: Category

  @ManyToOne(() => Season, { nullable: true })
  @JoinColumn({ name: 'id_season' })
  season?: Season | null
}
