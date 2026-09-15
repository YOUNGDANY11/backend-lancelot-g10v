import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MatchesModule } from 'src/matches/matches.module'
import { UsersModule } from 'src/users/users.module'
import { MatchStatistic } from './entities/match-statistic.entity'
import { MatchStatisticsController } from './match-statistics.controller'
import { MatchStatisticsService } from './match-statistics.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchStatistic]),
    UsersModule,
    MatchesModule,
  ],
  controllers: [MatchStatisticsController],
  providers: [MatchStatisticsService],
  exports: [MatchStatisticsService],
})
export class MatchStatisticsModule {}
