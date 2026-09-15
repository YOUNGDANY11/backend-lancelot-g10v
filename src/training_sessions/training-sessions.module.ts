import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesModule } from 'src/categories/categories.module'
import { SeasonsModule } from 'src/seasons/seasons.module'
import { TrainingSession } from './entities/training-session.entity'
import { TrainingSessionsController } from './training-sessions.controller'
import { TrainingSessionsService } from './training-sessions.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingSession]),
    CategoriesModule,
    SeasonsModule,
  ],
  controllers: [TrainingSessionsController],
  providers: [TrainingSessionsService],
  exports: [TrainingSessionsService],
})
export class TrainingSessionsModule {}
