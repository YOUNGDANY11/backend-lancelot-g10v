import { Season } from 'src/seasons/entities/season.entity'
import { Sport } from 'src/common/sport/sport-rules'
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

export enum EvaluationDimension {
  TECNICA = 'tecnica',
  TACTICA = 'tactica',
}

@Entity('technical_evaluations')
export class TechnicalEvaluation {
  @PrimaryGeneratedColumn()
  id_eval_tech: number

  @Column()
  id_user: number

  @Column()
  id_season: number

  @Column({
    type: 'enum',
    enum: EvaluationDimension,
    default: EvaluationDimension.TECNICA,
  })
  dimension: EvaluationDimension

  @Column({ type: 'enum', enum: Sport, nullable: true })
  sport: Sport | null

  @Column({ length: 60 })
  indicator: string

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  score: number

  @Column({ type: 'int', nullable: true })
  evaluator_id: number | null

  @Column({ type: 'date' })
  eval_date: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  athlete: User

  @ManyToOne(() => Season)
  @JoinColumn({ name: 'id_season' })
  season: Season

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: User
}
