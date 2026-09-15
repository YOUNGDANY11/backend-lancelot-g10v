import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum SeasonStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  CLOSED = 'closed',
}

@Entity('seasons')
export class Season {
  @PrimaryGeneratedColumn()
  id_season: number

  @Column({ length: 50 })
  name: string

  @Column({ type: 'date' })
  start_date: string

  @Column({ type: 'date', nullable: true })
  end_date?: string | null

  @Column({
    type: 'enum',
    enum: SeasonStatus,
    default: SeasonStatus.PLANNED,
  })
  status: SeasonStatus

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}
