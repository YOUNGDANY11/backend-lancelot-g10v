import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeasonsModule } from 'src/seasons/seasons.module'
import { UsersModule } from 'src/users/users.module'
import { TechnicalEvaluation } from './entities/technical-evaluation.entity'
import { TechnicalEvaluationsController } from './technical-evaluations.controller'
import { TechnicalEvaluationsService } from './technical-evaluations.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([TechnicalEvaluation]),
    UsersModule,
    SeasonsModule,
  ],
  controllers: [TechnicalEvaluationsController],
  providers: [TechnicalEvaluationsService],
})
export class TechnicalEvaluationsModule {}
