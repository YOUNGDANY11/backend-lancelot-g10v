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

export enum TalentFlagStatus {
  OPEN = 'open',
  REVIEWED = 'reviewed',
  DISMISSED = 'dismissed',
}

@Entity('talent_flags')
export class TalentFlag {
  @PrimaryGeneratedColumn()
  id_flag: number

  @Column()
  id_user: number

  @Column()
  id_season: number

  @Column({ type: 'text' })
  criteria: string

  @Column({ type: 'text' })
  recommended_action: string

  @Column({
    type: 'enum',
    enum: TalentFlagStatus,
    default: TalentFlagStatus.OPEN,
  })
  status: TalentFlagStatus

  @Column()
  created_by: number

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
  @JoinColumn({ name: 'created_by' })
  createdByUser: User
}
