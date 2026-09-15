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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
