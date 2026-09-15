import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('acwr_thresholds')
export class AcwrThreshold {
  @PrimaryGeneratedColumn()
  id_threshold: number

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0.8 })
  low_min: number

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 1.3 })
  low_max: number

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 1.5 })
  medium_max: number

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}
