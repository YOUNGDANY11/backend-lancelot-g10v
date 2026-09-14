import { Module } from '@nestjs/common';
import { CompetenciesService } from './competencies.service';
import { CompetenciesController } from './competencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competency } from './entities/competency.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Competency])],
  controllers: [CompetenciesController],
  providers: [CompetenciesService],
  exports:[CompetenciesService]
})
export class CompetenciesModule {}
