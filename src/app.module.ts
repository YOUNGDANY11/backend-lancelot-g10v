import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'
import { AthletesInCategoriesModule } from './athletes_in_categories/athletes_in_categories.module'
import { CategoriesModule } from './categories/categories.module'
import { AthletesInCompetenciesModule } from './athletes_in_competencies/athletes_in_competencies.module'
import { CompetenciesModule } from './competencies/competencies.module'
import { MatchesModule } from './matches/matches.module'
import { SeasonsModule } from './seasons/seasons.module'
import { PhysicalEvaluationsModule } from './physical_evaluations/physical-evaluations.module'
import { TechnicalEvaluationsModule } from './technical_evaluations/technical-evaluations.module'
import { ParentalConsentsModule } from './parental_consents/parental-consents.module'
import { HealthRecordsModule } from './health_records/health-records.module'
import { DevelopmentObjectivesModule } from './development_objectives/development-objectives.module'
import { TrainingSessionsModule } from './training_sessions/training-sessions.module'
import { TrainingLoadsModule } from './training_loads/training-loads.module'
import { MatchStatisticsModule } from './match_statistics/match-statistics.module'
import { InjuriesModule } from './injuries/injuries.module'
import { AcwrConfigModule } from './acwr_config/acwr-config.module'
import { FatigueAlertsModule } from './fatigue_alerts/fatigue-alerts.module'
import { InjuryRiskAssessmentsModule } from './injury_risk_assessments/injury-risk-assessments.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('URL_DB'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    AthletesInCategoriesModule,
    CategoriesModule,
    AthletesInCompetenciesModule,
    CompetenciesModule,
    MatchesModule,
    SeasonsModule,
    PhysicalEvaluationsModule,
    TechnicalEvaluationsModule,
    ParentalConsentsModule,
    HealthRecordsModule,
    DevelopmentObjectivesModule,
    TrainingSessionsModule,
    TrainingLoadsModule,
    MatchStatisticsModule,
    InjuriesModule,
    AcwrConfigModule,
    FatigueAlertsModule,
    InjuryRiskAssessmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
