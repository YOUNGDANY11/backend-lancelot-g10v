import { Module } from '@nestjs/common'
import { MatchesService } from './matches.service'
import { MatchesController } from './matches.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Match } from './entities/match.entity'
import { CategoriesModule } from 'src/categories/categories.module'
import { CompetenciesModule } from 'src/competencies/competencies.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    CategoriesModule,
    CompetenciesModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
