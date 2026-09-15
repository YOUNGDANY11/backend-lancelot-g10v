import { Module } from '@nestjs/common'
import { CompetenciesService } from './competencies.service'
import { CompetenciesController } from './competencies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Competency } from './entities/competency.entity'
import { SeasonsModule } from 'src/seasons/seasons.module'

@Module({
  imports: [TypeOrmModule.forFeature([Competency]), SeasonsModule],
  controllers: [CompetenciesController],
  providers: [CompetenciesService],
  exports: [CompetenciesService],
})
export class CompetenciesModule {}
