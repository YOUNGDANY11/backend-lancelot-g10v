import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeasonsModule } from 'src/seasons/seasons.module'
import { UsersModule } from 'src/users/users.module'
import { PhysicalEvaluation } from './entities/physical-evaluation.entity'
import { PhysicalEvaluationsController } from './physical-evaluations.controller'
import { PhysicalEvaluationsService } from './physical-evaluations.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PhysicalEvaluation]),
    UsersModule,
    SeasonsModule,
  ],
  controllers: [PhysicalEvaluationsController],
  providers: [PhysicalEvaluationsService],
})
export class PhysicalEvaluationsModule {}
