import { InjuryRiskLevel } from 'src/injury_risk_assessments/entities/injury-risk-assessment.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum FeatureLabelQuality {
  PENDING = 'pending',
  LABELED = 'labeled',
  UNKNOWN_MECHANISM = 'unknown_mechanism',
}

export const FEATURE_VERSION = 'v1'

/**
 * Snapshot diario de variables por deportista: dataset longitudinal para la
 * fase 2 (ML) del riesgo de lesión (Rossi et al., 2018; Van Eetvelde et al.,
 * 2021). Solo contiene variables numéricas y de contexto, nunca nombres.
 */
@Index('UQ_athlete_daily_features_user_date', ['id_user', 'date'], {
  unique: true,
})
@Entity('athlete_daily_features')
export class AthleteDailyFeatures {
  @PrimaryGeneratedColumn()
  id_feature: number

  // --- Identificación y contexto ---
  @Column()
  id_user: number

  @Index('IDX_athlete_daily_features_date')
  @Column({ type: 'date' })
  date: string

  @Column({ nullable: true })
  id_season?: number | null

  @Column({ nullable: true })
  id_category?: number | null

  @Column({ type: 'varchar', length: 30, nullable: true })
  position?: string | null

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  age_years?: number | null

  // --- Carga (session-RPE, Foster et al., 2001) ---
  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  acute_load_7d: number

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  chronic_load_28d: number

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  acwr?: number | null

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  acwr_ewma?: number | null

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  monotony_7d?: number | null

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  strain_7d?: number | null

  @Column({ type: 'smallint', default: 0 })
  sessions_7d: number

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  rpe_avg_7d?: number | null

  @Column({ type: 'int', default: 0 })
  match_minutes_7d: number

  @Column({ type: 'smallint', default: 0 })
  high_rpe_sessions_14d: number

  // --- Historial médico ---
  @Column({ type: 'int', default: 0 })
  prior_injuries_count: number

  @Column({ type: 'int', default: 0 })
  prior_non_contact_injuries_count: number

  @Column({ type: 'int', nullable: true })
  days_since_last_injury?: number | null

  @Column({ type: 'boolean', default: false })
  is_recovering: boolean

  @Column({ type: 'boolean', default: true })
  is_available: boolean

  // --- Referencia de la fase 1 (null = sin alerta de reglas ese día) ---
  @Column({ type: 'enum', enum: InjuryRiskLevel, nullable: true })
  rules_risk_level?: InjuryRiskLevel | null

  // --- Etiqueta: lesión sin contacto en los 7 días siguientes ---
  @Column({ type: 'boolean', nullable: true })
  label_injury_7d?: boolean | null

  @Column({
    type: 'enum',
    enum: FeatureLabelQuality,
    default: FeatureLabelQuality.PENDING,
  })
  label_quality: FeatureLabelQuality

  @Column({ type: 'timestamptz', nullable: true })
  labeled_at?: Date | null

  // --- Metadatos ---
  @Column({ type: 'varchar', length: 10, default: FEATURE_VERSION })
  feature_version: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date

  // Si se elimina el usuario se eliminan sus datos (Ley 1581 de 2012)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  athlete: User
}
