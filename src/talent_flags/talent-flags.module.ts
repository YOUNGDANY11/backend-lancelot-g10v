import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeasonsModule } from 'src/seasons/seasons.module'
import { UsersModule } from 'src/users/users.module'
import { TalentFlag } from './entities/talent-flag.entity'
import { TalentFlagsController } from './talent-flags.controller'
import { TalentFlagsService } from './talent-flags.service'

@Module({
  imports: [TypeOrmModule.forFeature([TalentFlag]), UsersModule, SeasonsModule],
  controllers: [TalentFlagsController],
  providers: [TalentFlagsService],
  exports: [TalentFlagsService],
})
export class TalentFlagsModule {}
