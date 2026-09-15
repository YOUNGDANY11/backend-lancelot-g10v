import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AcwrConfigController } from './acwr-config.controller'
import { AcwrConfigService } from './acwr-config.service'
import { AcwrThreshold } from './entities/acwr-threshold.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AcwrThreshold])],
  controllers: [AcwrConfigController],
  providers: [AcwrConfigService],
  exports: [AcwrConfigService],
})
export class AcwrConfigModule {}
