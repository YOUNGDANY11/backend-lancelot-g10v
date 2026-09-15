import { Category } from 'src/categories/entities/category.entity'
import { Season } from 'src/seasons/entities/season.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum TrainingSessionType {
  TECNICO = 'tecnico',
  FISICO = 'fisico',
  TACTICO = 'tactico',
  MIXTO = 'mixto',
}

@Entity('training_sessions')
export class TrainingSession {
  @PrimaryGeneratedColumn()
  id_session: number

  @Column()
  id_category: number

  @Column()
  id_season: number

  @Column({ type: 'date' })
  date: string

  @Column({ type: 'enum', enum: TrainingSessionType })
  type: TrainingSessionType

  @Column({ type: 'int' })
  planned_duration_min: number

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'id_category' })
  category: Category

  @ManyToOne(() => Season)
  @JoinColumn({ name: 'id_season' })
  season: Season
}
