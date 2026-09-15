import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrainingSessionsModule } from 'src/training_sessions/training-sessions.module'
import { UsersModule } from 'src/users/users.module'
import { TrainingLoad } from './entities/training-load.entity'
import { TrainingLoadsController } from './training-loads.controller'
import { TrainingLoadsService } from './training-loads.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingLoad]),
    UsersModule,
    TrainingSessionsModule,
  ],
  controllers: [TrainingLoadsController],
  providers: [TrainingLoadsService],
  exports: [TrainingLoadsService],
})
export class TrainingLoadsModule {}
