import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AcwrConfigModule } from 'src/acwr_config/acwr-config.module'
import { FatigueAlertsModule } from 'src/fatigue_alerts/fatigue-alerts.module'
import { InjuryRiskRuleConfigModule } from 'src/injury_risk_rule_config/injury-risk-rule-config.module'
import { Injury } from 'src/injuries/entities/injury.entity'
import { TrainingLoad } from 'src/training_loads/entities/training-load.entity'
import { UsersModule } from 'src/users/users.module'
import { InjuryRiskAssessment } from './entities/injury-risk-assessment.entity'
import { InjuryRiskAssessmentsController } from './injury-risk-assessments.controller'
import { InjuryRiskAssessmentsCronService } from './injury-risk-assessments-cron.service'
import { InjuryRiskAssessmentsService } from './injury-risk-assessments.service'
import { InjuryRiskRulesService } from './injury-risk-rules.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([InjuryRiskAssessment, TrainingLoad, Injury]),
    UsersModule,
    AcwrConfigModule,
    FatigueAlertsModule,
    InjuryRiskRuleConfigModule,
  ],
  controllers: [InjuryRiskAssessmentsController],
  providers: [
    InjuryRiskAssessmentsService,
    InjuryRiskAssessmentsCronService,
    InjuryRiskRulesService,
  ],
})
export class InjuryRiskAssessmentsModule {}
