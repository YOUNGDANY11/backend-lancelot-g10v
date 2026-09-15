import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AcwrConfigModule } from 'src/acwr_config/acwr-config.module'
import { TrainingLoad } from 'src/training_loads/entities/training-load.entity'
import { UsersModule } from 'src/users/users.module'
import { AcwrCalculatorService } from './acwr-calculator.service'
import { FatigueAlert } from './entities/fatigue-alert.entity'
import { FatigueAlertsController } from './fatigue-alerts.controller'
import { FatigueAlertsCronService } from './fatigue-alerts-cron.service'
import { FatigueAlertsService } from './fatigue-alerts.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([FatigueAlert, TrainingLoad]),
    UsersModule,
    AcwrConfigModule,
  ],
  controllers: [FatigueAlertsController],
  providers: [
    FatigueAlertsService,
    FatigueAlertsCronService,
    AcwrCalculatorService,
  ],
  exports: [AcwrCalculatorService],
})
export class FatigueAlertsModule {}
