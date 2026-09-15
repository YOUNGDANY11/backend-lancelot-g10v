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

@Entity('technical_evaluations')
export class TechnicalEvaluation {
  @PrimaryGeneratedColumn()
  id_eval_tech: number

  @Column()
  id_user: number

  @Column()
  id_season: number

  @Column({ length: 60 })
  indicator: string

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  score: number

  @Column()
  evaluator_id: number

  @Column({ type: 'date' })
  eval_date: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  athlete: User

  @ManyToOne(() => Season)
  @JoinColumn({ name: 'id_season' })
  season: Season

  @ManyToOne(() => User)
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: User
}
