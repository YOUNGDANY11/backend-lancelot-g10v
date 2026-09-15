import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PositionWeightProfile } from './entities/position-weight-profile.entity'
import { PositionWeightProfilesController } from './position-weight-profiles.controller'
import { PositionWeightProfilesService } from './position-weight-profiles.service'

@Module({
  imports: [TypeOrmModule.forFeature([PositionWeightProfile])],
  controllers: [PositionWeightProfilesController],
  providers: [PositionWeightProfilesService],
  exports: [PositionWeightProfilesService],
})
export class PositionWeightProfilesModule {}
