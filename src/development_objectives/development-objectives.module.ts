import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeasonsModule } from 'src/seasons/seasons.module'
import { UsersModule } from 'src/users/users.module'
import { DevelopmentObjectivesController } from './development-objectives.controller'
import { DevelopmentObjectivesService } from './development-objectives.service'
import { DevelopmentObjective } from './entities/development-objective.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([DevelopmentObjective]),
    UsersModule,
    SeasonsModule,
  ],
  controllers: [DevelopmentObjectivesController],
  providers: [DevelopmentObjectivesService],
})
export class DevelopmentObjectivesModule {}
